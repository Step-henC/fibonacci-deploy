const { Pool } = require("pg");
const keys = require("./keys");
const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser"); //parse incoming request into json

const app = express();
app.use(cors());
app.use(bodyParser.json())

const redis = require('redis');

//postgres client setup
const pgClient = new Pool({
user: keys.pgUser,
host: keys.pgHost,
database: keys.pgDatabase,
password: keys.pgPassword,
port: keys.pgPort,
ssl: false,
    // process.env.NODE_ENV !== 'production'   
    //     ? false 
    //         : {rejectUnauthorized: false},
});



pgClient.on("connect", (client) => {
    client  
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.log(err))
})

//redis client setup
const redisClient = redis.createClient({ 
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate(); // must duplicate because once a listener, cannot
                                                //use for other purposes

// Express route handlers
app.get('/', (req, res) => {
    res.send('hi');
});

//all values submitted to app
app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * from values");

    res.send(values.rows);
})

app.get("/values/current", async (req, res) => { //redis library does not have out-of-the-box promise support
    redisClient.hgetall('values', (err, values) => {
        res.send(values)
    })
})

//from react app and send to express server
app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (index > 40) {//cap index size to prevent a really long fibanacci recursive process
        return res.status(422).send('Index too high')
    }

    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index); //insert is the message sent to worker process to calculate fibonacci
    pgClient.query("INSERT INTO values (number) VALUES($1)", [index]) //list out index submitted

    res.send({working: true}) //arbitrary value
})

app.listen(5000, (err) => {
    console.log('listening')
})

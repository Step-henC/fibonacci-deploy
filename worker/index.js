const keys = require("./keys") //required connect to redis

const redis = require('redis');

const redisClient = redis.createClient({ //need redis because fib recurse is kinda slow
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
    if (index < 2) return 1;

    return fib(index-1) + fib(index -2);
}

sub.on("message", (channel, message) => {
     //listens to redis for any changes
    redisClient.hset("values", message, fib(parseInt(message)))
})

sub.subscribe('insert'); //any time someone inserts new value
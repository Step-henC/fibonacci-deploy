import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function Fib(){
   

    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})
    const [index, setIndex] = useState('')
    const entries = Object.keys(values)

useEffect(() => {
fetchValues()
fetchIndexes()
}, [])

   

 const fetchValues = async () => {
        const values = await axios.get('/api/values/current')
        setValues(values.data)
    }

     const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        setSeenIndexes(seenIndexes.data)
    }

   const handleSubmit = async (event) => { //want it a bound function
        event.preventDefault()

        await axios.post('/api/values', {
            index: index
        });
        setIndex('');
    }

    function renderseenIndexes(){
        return seenIndexes.map(({number }) => number).join(', ')
    }

   
    
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Enter Your index:</label>
                    <input 
                    value={index}
                    onChange={(event) => setIndex(event.target.value)}
                    />
                    <button>Submit</button>

                </form>
                <h3>Indexes I have seen:</h3>
                    {renderseenIndexes()}
                <h3>Calculated Values:</h3>
                {entries.map((key, index) => 
                <div key={index}>
                For index {key} I calculated {values[key]}
            </div>
                )}
            </div>
        )
    
}


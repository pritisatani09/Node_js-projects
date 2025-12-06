const mongoose = require('mongoose');

    const database = () =>{
        mongoose.connect(process.env.MONGO_URI,)
        .then(() => 
            console.log('Connected to the database'))
        .catch((err) => 
            console.log('Error connecting to the database', err)
        )
    }

    module.exports = database;    
    
const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect("mongodb://localhost:27017/bookstore")
        .then(() => console.log('DB is connected!!!!!!'))
        .catch((err) => console.log('DB connection error:', err));
}

module.exports = dbConnection;

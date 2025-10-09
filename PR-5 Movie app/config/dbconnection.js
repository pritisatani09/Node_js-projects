const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose.connect("mongodb+srv://pritisatani:541783@cluster0.bzgck5x.mongodb.net/Movistore")        
    .then(() => console.log("DB is connected..."))
        .catch(err => console.error("DB Connection Error:", err));
};

module.exports = dbconnection();

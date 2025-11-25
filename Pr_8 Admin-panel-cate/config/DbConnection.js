const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
 await mongoose.connect("mongodb+srv://pritisatani:541783@cluster0.bzgck5x.mongodb.net/OTP")       
 // await mongoose.connect("");
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
  }
};

module.exports = dbConnect;

const mongoose = require("mongoose");

async function connectToDB() {
  try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection To mongoDB...");
  } catch (error) {
    console.log("Connection Failed  To mongoDB...", error);
  }
}

module.exports = connectToDB;

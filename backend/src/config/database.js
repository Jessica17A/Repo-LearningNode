const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/learning_ok");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Mongo connection error:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

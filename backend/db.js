const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;

const connetToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to MongoDB successfully");
  } catch (error) {
    console.log({
      error: `Error connecting to Database`,
      message: `${error.message}`,
    });
  }
};

module.exports = connetToMongo;

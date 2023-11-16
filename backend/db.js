const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB_URI

const connetToMongo = async () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("connected to MongoDB successfully");
    })
    .catch((err) => {
      console.log({
        error: `Error connecting to Database`,
        message: `${err.message}`,
      });
    });
};

module.exports = connetToMongo;

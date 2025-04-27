require('dotenv').config();

const mongoose = require("mongoose"); //make sure you have, like import 

//connecting to Mongo cl
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(":white_check_mark: Connected to MongoDB (nme)")) // Success: MongoDB is ready
  .catch(err => console.error(":x: MongoDB connection error:", err)); // Failure: log error
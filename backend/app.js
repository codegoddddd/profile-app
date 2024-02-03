const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { json } = require("body-parser");
const cors = require("cors");

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/profiledb")
  .then(console.log("MongoDB Connected"))
  .catch((err) => {
    console.log(err);
  });

  // Enable CORS middleware to handle cross-origin resource sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define and use routes from the 'route' module, prefixed with '/abc'
const route = require("./route");
app.use("/abc", route);

// Start the server and listen on port 8000
app.listen(8000, () => console.log("Running at LocalHost 8000"));
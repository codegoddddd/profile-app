const mongoose = require('mongoose')

// Define the Mongoose schema for user profiles
const profileSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    mobile : Number,
    gender : String,
    address : String,
    birthdate : Date,
    education : String
})

// Create a Mongoose model named 'userDetails' based on the defined schema
module.exports = mongoose.model('userDetails',profileSchema)
const express = require('express');
const userController = require('./controller');

// Create an Express router
const route = express.Router();

// Route to register a new user
route.post('/register', userController.adduser);

// Route to get all user data
route.get('/findall', userController.getdata);

// Route to find a user by email
route.get('/findone/:email', userController.finduser);

// Route for user login
route.post('/login', userController.loginUser);

// Route to update user data by email
route.put('/update/:email', userController.updateuser);

// Route to delete user
route.delete('/delete/:email', userController.deleteuser);

// Export the router to use in the main application
module.exports = route;

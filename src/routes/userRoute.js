const express = require('express');
const { createUser } = require('../controllers/userController');

// we have to initialise a router object to add routes in a new File
//Routers are used for segregating your routes in different modules
const userRouter = express.Router();

userRouter.post('/', createUser)  // this is a route registration

module.exports = userRouter;
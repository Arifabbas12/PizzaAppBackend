const express = require('express');
const { login } = require('../controllers/authController');

// we have to initialise a router object to add routes in a new File
//Routers are used for segregating your routes in different modules
const AuthRouter = express.Router();

AuthRouter.post('/login', login)  // this is a route registration

module.exports = AuthRouter;
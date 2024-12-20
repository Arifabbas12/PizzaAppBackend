
const express = require('express');
const { getcartByUser, addProductToCart, modifyProductToCart, clearCartById } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidators');

const cartRouter = express.Router();

cartRouter.get('/',getcartByUser);
cartRouter.post('/add/:productId',isLoggedIn,addProductToCart);
cartRouter.post('/:operation/:productId',isLoggedIn,modifyProductToCart);
cartRouter.delete('/product', isLoggedIn, clearCartById);

module.exports = cartRouter;
const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddlewares');
const { isAdmin, isLoggedIn } = require('../validation/authValidators');

// we have to initialise a router object to add routes in a new File
//Routers are used for segregating your routes in different modules
const productRouter = express.Router();

productRouter.post(
    '/', 
    isLoggedIn, 
    isAdmin, 
    uploader.single('productImage'), addProduct); // this is a route registration
    
productRouter.get('/:id',getProduct);
productRouter.delete('/:id',deleteProduct);


module.exports = productRouter;
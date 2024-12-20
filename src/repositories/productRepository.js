
const product = require('../schema/productSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServerError');

async function createProduct(productDetails){

    try {
        const response = await product.create(productDetails);
        return response;
    } 
    catch (error) {
        if(error.name === 'validationError'){
           const errorMessageList =  Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
                
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
        
    }
}

async function getProductById(productId){
    try {
        const Product = await product.findById(productId);
        return Product;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function deleteProductById(productId){
    try {
        const response = await product.findByIdAndDelete(productId);
        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}
module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}
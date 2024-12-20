
const cloudinary = require('../config/cloudinaryConfig')
const productRepository = require('../repositories/productRepository')
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails){
  // 1. we should check if an image is coming to create a product , them we should first upload it on cloudinary
   
  const imagePath = productDetails.imagePath;
  if(imagePath){

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
    var productImage = cloudinaryResponse.secure_url;
    
    await fs.unlink(process.cwd() + "/" + imagePath); // file will be delete from uploads file
    } 
    
    catch (error) {
      console.log(error);
      throw new InternalServerError();
    }
    
  }
  // 2. Then use the url from cloudinary and other product details to add product in db
    const product = await productRepository.createProduct({
      ...productDetails,
      productImage: productImage
    });

    return product;
}

async function getProductById(productId){
  const response  = await productRepository.getProductById(productId);
  if(!response){
    throw new NotFoundError('Product');
  }
  return response;
}

async function deleteProductById(productId){
  const response  = await productRepository.deleteProductById(productId);
  if(!response){
    throw new NotFoundError('Product');
  }
  return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}
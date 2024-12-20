const { getCartByUserId, clearCart } = require("../repositories/cartRepository");
const { getProductById } = require("../repositories/productRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");

async function getCart( userId){
   const cart = await getCartByUserId( userId) ;
   if(!cart){
    throw new NotFoundError('Cart');
   }
   return cart;

}

async function addToCart(userId, productId){
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if(!product){
        throw new NotFoundError('Product')
    }

    if(!product.inStock && product.quantity <= 0 ){
        throw new BadRequestError(['Product not available in stock']);
    }

    // may be the product is already in the cart
    let foundProduct = false;
    cart.items.forEach(items => {
        if(items.product.toString() === productId){
            if(product.quantity >= items.quantity+1){
                items.quantity +=1 ;
            }else{
                throw new AppError('The quantity of the item requested is not available', 404);
            }
            foundProduct = true;
        }
    });

    if(!foundProduct){
        cart.items.push({
            product : productId,
            quantity: 1
        })
    }

    await cart.save();

    return cart;

}

async function modifyCart(userId, productId, shouldAdd = true){
    const quantityValue = (shouldAdd == true) ? 1: -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if(!product){
        throw new NotFoundError('Product')
    }

    if(!product.inStock && product.quantity <= 0 ){
        throw new BadRequestError(['Product not available in stock']);
    }

    // may be the product is already in the cart
    let foundProduct = false;
    cart.items.forEach(items => {
        if(items.product._id == productId){
            if(shouldAdd){
            if(product.quantity >= items.quantity+1){
                items.quantity += quantityValue ;
            }else{
                throw new AppError('The quantity of the item requested is not available', 404);
            }
        }else{
              if(items.quantity > 0) {
                items.quantity += quantityValue;
                if(items.quantity == 0){
                    cart.items = cart.items.filter(items => items.product._id != productId);
                    foundProduct = true;
                    return;
                }
            }else{
                throw new AppError('The quantity of the item requested is not available', 404);
            }
            }
            foundProduct = true;
        }
    });

    if(!foundProduct){
        if(shouldAdd){
            cart.items.push({
                product : productId,
                quantity: 1
            })
        }else{
            throw new NotFoundError('product in the cart')
        }
        
    }

    await cart.save();

    return cart;

}

async function clearProductFromCart( userId ){
    const response = await clearCart(userId);
    return response;
}

module.exports = {
    getCart,
    addToCart,
    modifyCart,
    clearProductFromCart
};
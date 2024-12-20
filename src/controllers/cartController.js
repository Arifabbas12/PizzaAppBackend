const { getCart, addToCart, modifyCart, clearProductFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getcartByUser(req, res){
    try {
        const cart = await getCart(req.body.userId);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetch the cart',
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data:{}
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data:{}
        });
    }
}


async function addProductToCart(req, res){
    try {
        const cart = await addToCart(req.body.userId, req.params.productId);
        return res.status(200).json({
            success: true,
            message: 'Successfully added product to the cart',
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data:{}
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data:{}
        });
    }
}

async function modifyProductToCart(req, res){
    try {
        const cart = await modifyCart(req.body.userId, req.params.productId, req.params.operation == 'add');
        return res.status(200).json({
            success: true,
            message: 'Successfully added product to the cart',
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data:{}
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data:{}
        });
    }
}

async function clearCartById( req, res){
    try {
        const cart = await clearProductFromCart(req.body.userId);
        return res.status(200).json({
            success: true,
            message: 'Successfully clear all product from the cart',
            error: {},
            data: cart
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data:{}
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data:{}
        });
    }
}

module.exports = {
    getcartByUser,
    addProductToCart,
    modifyProductToCart,
    clearCartById
}
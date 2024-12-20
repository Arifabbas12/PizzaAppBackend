
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Product name is required"],
        minLength: [5,"product name must be atLeast 5 character"],
        trim: true
    },

    description: {
        type: String,
        minLength: [5, "Description must be atleast 5 character"],
    },

    productImage: {
        type: String,
    },

    quantity: {
        type: Number,
        required: true,
        default: 10
    },

    price: {
        type: Number,
        required: [true, "Product price is required"]
    },

    category: {
        type: String,
        enum: ["vegs","non-vegs","drinks","sides"],
        default: 'vegs'
    },

    inStock: {
        type: Boolean,
        required: [true, "inStock status is required"],
        default: true,
    }
},{
    timestamps: true,
});

const product = mongoose.model('product', productSchema);

module.exports = product
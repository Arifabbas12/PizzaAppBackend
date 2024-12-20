
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,

    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalprice :{
        type: Number,
        required: true
    },
    status: {
        type: String,
        default:'ORDERED',
        enum: ['ORDERED', 'CANCELLED', 'DELIVERED','PROCESSING','OUT_FOR_DELIVERY']
    },
    address: {
        type: String,
        minlength: [10, 'Address should be of 10 characters'],
       
    },
    paymentMethod: {
        type: String,
        default: 'CASH',
        enum: ['ONLINE', 'CASH']
    }
},{
    timestamps: true
});

const order = mongoose.model('order', orderSchema);

module.exports = order;
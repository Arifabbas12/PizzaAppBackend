
const mongoose  = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user',
        unique: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'product'
            },

            quantity: {
                type: Number,
                require: true,
                default: 1
            }
        }
    ],
},{
    timestamps: true
})

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;


const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    dishId: {
        type: String
    },
    dishName: {
        type: String
    },
    quantity: {
        type: Number
    },
    prepared: {
        type: Number
    },
    predicted: {
        type: Number
    }
})

const Order = module.exports = mongoose.model('Order', OrderSchema);
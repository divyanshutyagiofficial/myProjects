const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: {
        type: String
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    read: {
        type: Boolean
    }
})

const Message = module.exports = mongoose.model('Messages', MessageSchema);
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    contact: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const User = module.exports = mongoose.model('Users', UserSchema);
const mongoose = require('mongoose');

const CoverSchema = mongoose.Schema({
    name:{
        type: String
    }
})

const Cover = module.exports = mongoose.model('Cover', CoverSchema);
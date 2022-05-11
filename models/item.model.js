const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }
});

 module.exports = mongoose.model('Item', itemSchema);
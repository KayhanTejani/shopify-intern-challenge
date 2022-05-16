const mongoose = require('mongoose');

let shipmentSchema = new mongoose.Schema({
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
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('Shipment', shipmentSchema);
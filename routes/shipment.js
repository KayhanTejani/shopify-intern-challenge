const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment.model');


router.get('/', (req, res) => {
    Shipment.find((err, shipments) => {
        if (!err) {
            res.render("shipment/index", {
                list: shipments
            });
        }
    }).lean();
});

router.get('/create', (req, res) => {
    res.render("shipment/createShipment");
});

router.post('/create', (req, res) => {
    const shipment = new Shipment({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price,
        status: "Processing"
    })

    shipment.save((err, doc) => {
        if (!err) {
            res.redirect('/shipment')
        }
        else {
            console.log(`Error during shipment creation: ${err}`);
        }
    });
});

module.exports = router;
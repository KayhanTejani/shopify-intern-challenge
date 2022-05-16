const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment.model');


router.get('/', (req, res) => {
    res.render("shipment/index");
});

router.get('/create', (req, res) => {
    res.render("shipment/createShipment");
});

router.post('/create', (req, res) => {
    res.redirect('/shipment');
});

module.exports = router;
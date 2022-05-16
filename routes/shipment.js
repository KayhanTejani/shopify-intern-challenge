const express = require('express');
const router = express.Router();
const Item = require('../models/item.model');
const Shipment = require('../models/shipment.model');


router.get('/', async (req, res, next) => {
    let shipments;
    try {
        shipments = await Shipment.find().lean().exec();
    }
    catch (err) {
        const errorMessage = `Error getting shipments list: ${err}`;
        handleError(errorMessage, next);
    }
    
    if (shipments) {
        try {
            const items = await Item.find().lean().exec();
            res.render("shipment/index", {
                list: shipments,
                products: items
            });
        }
        catch (err) {
            const errorMessage = `Error getting shipments list: ${err}`;
            handleError(errorMessage, next);
        }
    }

});

router.get('/create', async (req, res, next) => {
    const product = req.query.product;
    try {
        findResult = await Item.find( {name: product} ).lean().exec();
        res.render("shipment/createShipment", {
            item: findResult[0]
        });
        return;
    }
    catch (err) {
        const errorMessage = `Error getting sales list: ${err}`;
        handleError(errorMessage);
    }
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

router.get('/complete/:name/:quantity', (req, res) => {
    Item.findOneAndUpdate({name: req.params.name}, { $inc: { quantity: req.params.quantity } }, { new: true }, (err, findResult) => {
        if (err) {
            console.log(`Could not update product inventory: ${err}`);
        }
    });

    Shipment.findOneAndUpdate({name: req.params.name}, {status: "Completed"}, {new: true}, (err, findResult) => {
        if (err) {
            console.log(`Could not update shipment status: ${err}`);
        }
        else {
            res.redirect('/shipment');
        }
    });
})

module.exports = router;
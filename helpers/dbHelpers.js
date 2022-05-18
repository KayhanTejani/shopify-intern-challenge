require('../models/db');

const Item = require('../models/item.model');
const Shipment = require('../models/shipment.model');

function handleError(errorMessage, next) {
    console.error(errorMessage);
    const error = new Error(errorMessage);
    next(error);
}

async function getItems(next) {
    try {
        const items = await Item.find().lean().exec();
        return items;
    } catch (err) {
        const errorMessage = `Error getting items: ${err}`;
        handleError(errorMessage, next);
    }
}

async function createItem(req, next) {
    try {
        const item = new Item({
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
        });

        await item.save();
    } catch (err) {
        const errorMessage = `Error creating item: ${err}`;
        handleError(errorMessage, next);
    }
}

async function retrieveItem(req, next) {
    try {
        const item = await Item.findById(req.params.id).lean().exec();
        return item
    } catch (err) {
        const errorMessage = `Error retrieving item: ${err}`;
        handleError(errorMessage, next);
    }
}

async function retrieveItemByName(req, next) {
    try {
        findResult = await Item.find( {name: req.query.product} ).lean().exec();
        return findResult[0];
    }
    catch (err) {
        const errorMessage = `Error retrieving item: ${err}`;
        handleError(errorMessage);
    }
}

async function updateItem(req, next) {
    try {
        await Item.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true });
        return;
    } catch (err) {
        const errorMessage = `Error updating item: ${err}`;
        handleError(errorMessage, next);
    }
}

async function deleteItem(req, next) {
    try {
        await Item.findByIdAndRemove(req.params.id);
        return;
    } catch (err) {
        const errorMessage = `Error deleting item: ${err}`;
        handleError(errorMessage, next);
    }
}

async function getShipments(next) {
    try {
        const shipments = await Shipment.find().lean().exec();
        return shipments;
    } catch (err) {
        const errorMessage = `Error getting shipments: ${err}`;
        handleError(errorMessage, next);
    }
}

async function createShipment(req, next) {
    try {
        const shipment = new Shipment({
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            status: "Processing"
        });

        await shipment.save();
    } catch (err) {
        const errorMessage = `Error creating shipment: ${err}`;
        handleError(errorMessage, next);
    }
}

async function completeShipment(req, next) {
    try {
        await Shipment.findOneAndUpdate({name: req.params.name}, {status: "Completed"}, {new: true});
        return;
    }
    catch (err) {
        const errorMessage = `Error completing shipment: ${err}`;
        handleError(errorMessage, next);
    }
}

async function updateInventory(req, next) {
    try {
        await Item.findOneAndUpdate({name: req.params.name}, { $inc: { quantity: req.params.quantity } }, { new: true });
        return;
    }
    catch (err) {
        const errorMessage = `Error updating inventory: ${err}`;
        handleError(errorMessage, next);        
    }
}

module.exports = {
    getItems,
    createItem,
    retrieveItem,
    retrieveItemByName,
    updateItem,
    deleteItem,
    getShipments,
    createShipment,
    completeShipment,
    updateInventory
}
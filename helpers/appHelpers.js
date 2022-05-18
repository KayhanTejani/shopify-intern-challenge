const dbHelpers = require('./dbHelpers');

async function getItems(req, res, next) {
    const items = await dbHelpers.getItems(next);
    if (items) {
        res.render("item/index", {
            list: items
        })
        return;
    }
}

async function addItem(req, res, next) {
    res.render("item/addOrEdit", {
        viewTitle: "Create Item Entry"
    });
}

async function createItem(req, res, next) {
    await dbHelpers.createItem(req, next);
    res.redirect('/');
}

async function retrieveItem(req, res, next) {
    const itemFound = await dbHelpers.retrieveItem(req, next);
    res.render("item/addOrEdit", {
        viewTitle: "Update Item",
        item: itemFound
    });
}

async function updateItem(req, res, next) {
    await dbHelpers.updateItem(req, next);
    res.redirect('/');
}

async function deleteItem(req, res, next) {
    await dbHelpers.deleteItem(req, next);
    res.redirect('/');
}

async function getShipments(items, req, res, next) {
    const shipments = await dbHelpers.getShipments(next);
    if (shipments) {
        res.render("shipment/index", {
            list: shipments,
            products: items
        })
        return;
    }
}

async function createShipmentPage(req, res, next) {
    const itemFound = await dbHelpers.retrieveItemByName(req, res, next);
    if (itemFound) {
        res.render("shipment/createShipment", {
            item: itemFound
        });
        return;
    }
}

async function createShipment(req, res, next) {
    await dbHelpers.createShipment(req, next);
    res.redirect('/shipment');
}

async function completeShipment(req, res, next) {
    await dbHelpers.completeShipment(req, next);
    res.redirect('/shipment');
}

async function updateInventory(req, res, next) {
    await dbHelpers.updateInventory(req, next);
}

module.exports = {
    getItems,
    addItem,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
    getShipments,
    createShipmentPage,
    createShipment,
    completeShipment,
    updateInventory
}
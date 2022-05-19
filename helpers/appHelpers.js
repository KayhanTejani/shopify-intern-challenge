const dbHelpers = require('./dbHelpers');

// Renders inventory item list view
async function getItems(req, res, next) {
    const items = await dbHelpers.getItems(next);
    if (items) {
        res.render("item/index", {
            list: items
        })
        return;
    }
}

// Renders create item page
async function addItem(req, res, next) {
    res.render("item/addOrEdit", {
        viewTitle: "Create Item Entry"
    });
}

// Processes POST request to store creted item in DB
async function createItem(req, res, next) {
    await dbHelpers.createItem(req, next);
    res.redirect('/');
}

// Renders page to update item
async function retrieveItem(req, res, next) {
    const itemFound = await dbHelpers.retrieveItem(req, next);
    res.render("item/addOrEdit", {
        viewTitle: "Update Item",
        item: itemFound
    });
}

// Processes POST request to update existing item
async function updateItem(req, res, next) {
    await dbHelpers.updateItem(req, next);
    res.redirect('/');
}

// Processes DELETE request
async function deleteItem(req, res, next) {
    await dbHelpers.deleteItem(req, next);
    res.redirect('/');
}

// Renders shipment list view
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

// Renders create shipment page
async function createShipmentPage(req, res, next) {
    const itemFound = await dbHelpers.retrieveItemByName(req, res, next);
    if (itemFound) {
        res.render("shipment/createShipment", {
            item: itemFound
        });
        return;
    }
}

// Processes POST request to store new shipment in DB
async function createShipment(req, res, next) {
    await dbHelpers.createShipment(req, next);
    res.redirect('/shipment');
}

// Processes request to complete shipment
async function completeShipment(req, res, next) {
    await dbHelpers.completeShipment(req, next);
    res.redirect('/shipment');
}

// Processes request to update item quantity in inventory
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
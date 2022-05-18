const express = require('express');
const router = express.Router();
const appHelpers = require('../helpers/appHelpers');
const dbHelpers = require('../helpers/dbHelpers');


router.get('/', async (req, res, next) => {
    const items = await dbHelpers.getItems(req, res, next);
    await appHelpers.getShipments(items, req, res, next);
});

router.get('/create', async (req, res, next) => {
    await appHelpers.createShipmentPage(req, res, next);
});

router.post('/create', async (req, res, next) => {
    await appHelpers.createShipment(req, res, next);
});

router.get('/complete/:name/:quantity', async (req, res, next) => {
    await appHelpers.updateInventory(req, res, next);
    await appHelpers.completeShipment(req, res, next);
})

module.exports = router;
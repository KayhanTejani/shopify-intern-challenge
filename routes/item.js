const express = require('express');
const router = express.Router();
const appHelpers = require('../helpers/appHelpers');


router.get('/create', async (req, res, next) => {
    await appHelpers.addItem(req, res, next);
});

router.post('/create', async (req, res, next) => {
    if (req.body._id == "") {
        await appHelpers.createItem(req, res, next);
    }
    else {
        await appHelpers.updateItem(req, res, next);
    }
});

router.get('/:id', async (req, res, next) => {
    await appHelpers.retrieveItem(req, res, next);
});

router.get('/delete/:id', async (req, res, next) => {
    await appHelpers.deleteItem(req, res, next);
});

module.exports = router;
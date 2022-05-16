const express = require('express');
const router = express.Router();
const Item  = require('../models/item.model');


router.get('/create', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Create Item Entry"
    });
});

router.post('/create', (req, res) => {
    if (req.body._id == "") {
        insertItem(req, res);
    }
    else {
        // console.log("Existing item has to be updated");
        updateItem(req, res);
    }
});

router.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, itemFound) => {
        if (!err) {
            res.render("item/addOrEdit", {
                viewTitle: "Update Item",
                item: itemFound
            });
        }
        else {
            console.log(`Error in retrieving item: ${err}`);
        }
    }).lean();
});

function insertItem(req, res) {
    const item = new Item({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.qty,
        price: req.body.price
    });

    item.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        }
        else {
            console.log(`Error while saving item: ${err}`);
        }
    });
}

function updateItem(req, res) {
    console.log(req.body);
    Item.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true }, (err, doc) => {
        if (!err) {
            // console.log("item should have updated");
            res.redirect('/');
        }
        else {
            console.log(`Error while updating item: ${err}`);
        }
    });
};

router.get('/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/");
        }
        else {
            console.log(`Error while deleting item: ${err}`);
        }
    });
});

module.exports = router;
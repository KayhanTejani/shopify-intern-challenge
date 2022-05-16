require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Item = require('./models/item.model');
const Shipment = require('./models/shipment.model');
const { insertMany } = require('./models/item.model');

 // Express setup
const app = express();

app.use(express.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: true
}));


// Routes
app.get('/', (req, res) => {
    Item.find((err, items) => {
        if (!err) {
            res.render("item/index", {
                list: items
            });
        }
        else {
            console.log(`Error in retrieving item list: ${err}`);
        }
    }).lean();
});

app.get('/create', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Create Item Entry"
    });
});

app.post('/create', (req, res) => {
    if (req.body._id == "") {
        insertItem(req, res);
    }
    else {
        updateItem(req, res);
    }
});

app.get('/shipment', (req, res) => {
    res.render("shipment/index");
});

app.get('/shipment/create', (req, res) => {
    res.render("shipment/createShipment");
});

app.post('/shipment/create', (req, res) => {
    res.redirect('/shipment');
});

app.get('/:id', (req, res) => {
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
    Item.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true }, (err, doc) => {        
        if (!err) {
            res.redirect('/');
        }
        else {
            console.log(`Error while updating item: ${err}`);
        }
    });
};

app.get('/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect("/");
        }
        else {
            console.log(`Error while deleting item: ${err}`);
        }
    });
});

app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});
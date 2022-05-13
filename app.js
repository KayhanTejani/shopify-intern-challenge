require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Item = require('./models/item.model')

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
app.get('/create', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Create Item Entry"
    });
});

app.post('/create', (req, res) => {
    console.log(req.body);
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
    })
});

app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});
require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Item = require('./models/item.model');
const itemRoute = require('./routes/item');
const shipmentRoute = require('./routes/shipment');
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


app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});


// Routers
app.use('/item', itemRoute);
app.use('/shipment', shipmentRoute);
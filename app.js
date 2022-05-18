require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const itemRoute = require('./routes/item');
const shipmentRoute = require('./routes/shipment');
const appHelpers = require('./helpers/appHelpers');

 // Express setup
const app = express();

app.use(express.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: true
}));


// Load static assets
app.use(express.static('public'));


// Routes
app.get('/', async (req, res, next) => {
    await appHelpers.getItems(req, res, next);
});


app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});


// Routers
app.use('/item', itemRoute);
app.use('/shipment', shipmentRoute);
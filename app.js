require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

 // Express setup
const app = express();

app.use(express.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.json('Items');
});

app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});
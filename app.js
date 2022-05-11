require('./models/db');

const express = require('express');

 // Express setup
const app = express();

app.get('/', (req, res) => {
    res.json('Items');
});

app.listen(3000, () => {
    console.log("Express server started at port : 3000");
});
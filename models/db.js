const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = process.env['DB_CONNECT']

mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    }
    else {
        console.log('Error in DB connection: ' + err)
    }
});

require('./item.model');
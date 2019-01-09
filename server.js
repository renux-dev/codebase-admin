//env
require('dotenv').config()

const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
var cors = require('cors');
var morgan = require('morgan');

// Morgan
app.use(morgan('dev'))

// Use Cors All Cors Requests
app.use(cors())

// Use Helmet
app.use(helmet())

// parse requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// listen for requests
app.listen(port);

// Configuring mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

//Routes
require('./routes/kat.routes.js')(app);

// Connecting to the database
mongoose.connect(process.env.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database kat");    
}).catch(err => {
    console.log('Could not connect to the database kat .', err);
    process.exit();
});
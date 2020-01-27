const express = require('express');
const logger =require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const passport = require('passport');
require('./server/models');
require('./server/config/passport');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(bodyParser.json({limit:'500000'}));
app.use(bodyParser.urlencoded({limit:'500000',extended:false}));
app.use(express.static(path.join(__dirname,'dist')));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
	next();
});
//catch all wild routes
const routes = require('./server/routes/index');
app.use('/', routes);
app.get('*', (req, res) => {
    res.send('oops! we could not find that');
})
module.exports = app;
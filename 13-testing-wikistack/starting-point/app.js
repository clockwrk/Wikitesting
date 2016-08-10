//Boiler-plate module -always incude
var express = require('express');
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//Invoking express app session and setting destination for routes
var app = express();
var wikiRouter = require('./routes/wiki');
var usersRouter = require('./routes/users');

//Rendering engine tells express to use swig to draw up html pages
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Logger invoked and used during this session
app.use(morgan('dev'));

//Parses the req and res for things we care about
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Dynamic routing
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

//Pipelines into other sections, Here we are piping into users and wikipages
app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

//Main entry point for routing. Also previous modules will be on and ready to be
//used down the pipeline
app.get('/', function (req, res) {
    res.redirect('/wiki');
});

//Error handler, must be included at the end and use 4 arguments in order 
//Express to know its the error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

//Exports the app with the dependences attached, makes it visile to route
module.exports = app;
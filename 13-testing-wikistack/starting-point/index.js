//routes-in all the other pages to one to be synched 
//before settig up the listener to listen to the 
//next request
var models = require('./models');
var Page = models.Page;
var User = models.User;
var app = require('./app');

User.sync()
    .then(function () {
        return Page.sync();
    })
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    });


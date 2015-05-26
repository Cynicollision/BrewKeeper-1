// modules
var express = require('express'),
    mongoose = require('mongoose');

// configuration
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    app = express(),
    config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

app.listen(config.port);
console.log('BrewKeeper server listening on port ' + config.port);

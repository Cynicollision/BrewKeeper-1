(function () {
    'use strict';

    var express = require('express'),
        app = express(),
        //env = require('./server/config/environment'),
        config = require('./server/config/config');
    
    console.log('NODE_ENV = ' + config.env);

    require('./server/config/express')(app, config);
    require('./server/config/mongoose')(config);
    require('./server/config/passport')();
    require('./server/config/routes')(app);
    
    app.locals.dev = config.debug;
    
    app.listen(config.port);
    console.log('BrewKeeper server listening on port ' + config.port);
})();

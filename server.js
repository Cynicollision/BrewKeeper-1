(function () {
    'use strict';

    var express = require('express'),
        env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        app = express(),
        config = require('./server/config/config')[env];
    
    console.log('NODE_ENV = ' + env);

    require('./server/config/express')(app, config);
    require('./server/config/mongoose')(config);
    require('./server/config/passport')();
    require('./server/config/routes')(app);
    
    app.locals.dev = (env === 'development');
    
    app.listen(config.port);
    console.log('BrewKeeper server listening on port ' + config.port);
})();

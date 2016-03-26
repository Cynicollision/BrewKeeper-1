(function () {
    'use strict';
    
    var path = require('path'),
        rootPath = path.normalize(__dirname + '/../../'),
        env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    
    var developmentConfig = {
        env: env,
        debug: true,
        db: 'mongodb://brewjournal:brewj0urnaL@localhost:27017/vast',
        rootPath: rootPath,
        port: 3030
    };
    
    var productionConfig = {
        env: env,
        db: 'mongodb://brewkeeper:keeperbrew@ds051833.mongolab.com:51833/heroku_lm132nw3',
        rootPath: rootPath,
        port: process.env.PORT || 80
        // for local testing:
        //port: 3030
    };

    module.exports = (env === 'production' ? productionConfig : developmentConfig);
})();

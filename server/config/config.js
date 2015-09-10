(function () {
    'use strict';

    var path = require('path'),
        rootPath = path.normalize(__dirname + '/../../');
    
    module.exports = {
        development: {
            db: 'mongodb://brewjournal:brewj0urnaL@localhost:27017/vast',
            rootPath: rootPath,
            port: 3030
        },
        production: {
            db: 'mongodb://brewkeeper:keeperbrew@ds061268.mongolab.com:61268/heroku_app37114486',
            rootPath: rootPath,
            port: process.env.PORT || 80
        }
    };
})();

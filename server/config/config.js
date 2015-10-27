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
            db: 'mongodb://brewkeeper:keeperbrew@ds051833.mongolab.com:51833/heroku_lm132nw3',
            rootPath: rootPath,
            port: 3030
            // TODO: UNDO THIS!
            //port: process.env.PORT || 80
        }
    };
})();

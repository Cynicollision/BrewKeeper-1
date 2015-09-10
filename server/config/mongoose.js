(function () {
    'use strict';

    var mongoose = require('mongoose');
    require('../models/User');
    require('../models/Brew');
    require('../models/Recipe');
    
    module.exports = function (config) {
        mongoose.connect(config.db);
        mongoose.connection.on('error', console.error.bind(console, 'connection error...'));
        mongoose.connection.once('open', function callback() {
            console.log('vast db online');
        });
    };
})();

﻿var mongoose = require('mongoose')

module.exports = function (config) {
    mongoose.connect(config.db);
    mongoose.connection.on('error', console.error.bind(console, 'connection error...'));
    mongoose.connection.once('open', function callback() {
        console.log('vast db online');
    });
};

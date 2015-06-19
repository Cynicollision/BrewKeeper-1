var Brew = require('mongoose').model('Brew');

exports.getBrews = function (req, res) {
    Brew.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

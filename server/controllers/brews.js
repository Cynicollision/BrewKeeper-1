var Brew = require('mongoose').model('Brew');

exports.getBrews = function (req, res) {
    Brew.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getBrewById = function (req, res) {
    Brew.findOne({ _id: req.params.id }).exec(function (err, brew) {
        res.send(brew);
    });
};

var Brew = require('mongoose').model('Brew');

exports.getBrews = function (req, res) {
    Brew.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

// TODO: 
//exports.getBrewsByUser = function (req, res) {
//    Brew.find({}).exec(function (err, collection) {
//        res.send(collection);
//    });
//};

exports.saveBrew = function (req, res) {
    var brewData = req.body;
    
    Brew.create(brewData, function (err, jellybean, snickers) {
        if (err) {
            res.send({ reason: err.toString() });
        }

        res.send(200);
    });
    
};

exports.getBrewById = function (req, res) {
    Brew.findOne({ _id: req.params.id }).exec(function (err, brew) {
        res.send(brew);
    });
};

var Brew = require('mongoose').model('Brew');

exports.getBrews = function (req, res) {
    Brew.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getBrewsByUserId = function (req, res) {
    var userId = req.params.id;

    Brew.find({brewedBy: userId}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.saveBrew = function (req, res) {
    var brewData = req.body;
    
    Brew.create(brewData, function (err) {
        if (err) {
            res.send({ reason: err.toString() });
        }

        res.send(200);
    });
};

exports.updateBrew = function (req, res) {
    var brewUpdates = req.body,
        query = { _id: brewUpdates.id },
        update = {
            name: brewUpdates.name,
            brewedOn: brewUpdates.brewedOn
        },
        options = { multi: false };
    
    Brew.update(query, update, options, function (err) {
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

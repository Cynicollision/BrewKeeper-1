var Brew = require('mongoose').model('Brew');

exports.getAllBrews = function (req, res) {
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

exports.getBrewById = function (req, res) {
    Brew.findOne({ _id: req.params.id }).exec(function (err, brew) {
        res.send(brew);
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
    var currentUserId,
        brewUpdates = req.body,
        query = { _id: brewUpdates.id },
        update = {
            name: brewUpdates.name,
            brewedOn: brewUpdates.brewedOn
        },
        options = { multi: false };
    
    // verify the current user owns this brew
    if (!!req.user) {
        currentUserId = req.user._id.toString();
    }
    
    Brew.findOne({ _id: brewUpdates.id }).exec(function (err, brew) {
        if (!!brew && brew.brewedBy === currentUserId) {
            Brew.update(query, update, options, function (err) {
                if (err) {
                    res.send({ reason: err.toString() });
                }
                
                res.send(200);
            });
        } else {
            res.send(403, "Not authorized");
        }
    });
};

exports.deleteBrew = function (req, res) {
    var currentUserId, 
        deleteBrewId = req.params.id;
    

    if (!!req.user) {
        currentUserId = req.user._id.toString();
    }
    
    Brew.findOne({ _id: deleteBrewId }).exec(function (err, brew) {
        if (!!brew && brew.brewedBy === currentUserId) {
            Brew.remove({ _id: deleteBrewId }, function (err) {
                if (err) {
                    res.send({ reason: err.toString() });
                }
            });
        } else {
            res.send(403, "Not authorized");
        }
    });

    res.send(200);
};

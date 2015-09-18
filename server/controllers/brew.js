﻿(function () {
    'use strict';

    var Brew = require('mongoose').model('Brew');
    
    exports.getAllBrews = function (req, res) {
        Brew.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    };
    
    exports.getBrewsByUserId = function (req, res) {
        var userId = req.params.id;
        Brew.find({ ownerId: userId }).exec(function (err, collection) {
            res.send(collection);
        });
    };
    
    exports.getBrewById = function (req, res) {
        Brew.findOne({ _id: req.params.id }).exec(function (err, brew) {
            if (brew) {
                res.send(brew);
            } else {
                res.send(404, { reason: 'Invalid brew ID given.' });
            }
        });
    };
    
    // doing it wrong: why do these undefined values come in as strings?
    function sanitizeUndefinedBrewValues(brew) {
        if (brew.brewDate === 'undefined') {
            brew.brewDate = undefined;
        }
        if (brew.bottleDate === 'undefined') {
            brew.bottleDate = undefined;
        }
        if (brew.chillDate === 'undefined') {
            brew.chillDate = undefined;
        }
        if (brew.description === 'undefined') {
            brew.description = '';
        }
    }
    
    exports.saveNewBrew = function (req, res) {
        var currentUserId,
            brewData = req.body;
        
        // verify user is logged in as who they say they are
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        sanitizeUndefinedBrewValues(brewData);

        if (currentUserId === brewData.ownerId) {
            Brew.create(brewData, function (err) {
                if (err) {
                    res.send(500, { reason: err.toString() });
                } else {
                    res.send(200);
                }
            });
        } else {
            res.send(403, { reason: 'Not authorized' });
        }
    };
    
    exports.updateBrew = function (req, res) {
        var currentUserId,
            brewUpdates = req.body,
            query = { _id: brewUpdates.id },
            update = {
                batchSize: brewUpdates.batchSize,
                brewDate: brewUpdates.brewDate,
                bottleDate: brewUpdates.bottleDate,
                chillDate: brewUpdates.chillDate,
                description: brewUpdates.description,
                recipeId: brewUpdates.recipeId,
                statusCde: brewUpdates.statusCde
            },
            options = { multi: false };
        
        // verify the current user owns this brew
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        Brew.findOne(query).exec(function (err, brew) {
            if (!!brew && brew.ownerId === currentUserId) {
                Brew.update(query, update, options, function (err) {
                    if (err) {
                        res.send(500, { reason: err.toString() });
                    } else {
                        res.send(200);
                    }
                });
            } else {
                res.send(403, { reason: 'Not authorized' });
            }
        });
    };
    
    exports.deleteBrew = function (req, res) {
        var currentUserId, 
            deleteBrewId = req.params.id,
            query = { _id: deleteBrewId };
        
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        Brew.findOne(query).exec(function (err, brew) {
            if (!!brew && brew.ownerId === currentUserId) {
                Brew.remove(query, function (err) {
                    if (err) {
                        res.send({ reason: err.toString() });
                    }
                    
                    res.send(200);
                });
            } else {
                res.send(403, { reason: 'Not authorized' });
            }
        });
    };
})();
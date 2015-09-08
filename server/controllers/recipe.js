(function () {
    'use strict';

    var Recipe = require('mongoose').model('Recipe');
    
    exports.getRecipes = function (req, res) {
        Recipe.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    };
    
    exports.getRecipeById = function (req, res) {
        Recipe.findOne({ _id: req.params.id }).exec(function (err, recipe) {
            if (recipe) {
                res.send(recipe);
            } else {
                res.send(404, { reason: 'Invalid recipe ID given.' });
            }
        });
    };
    
    exports.getRecipesByUserId = function (req, res) {
        var userId = req.params.id;
        
        Recipe.find({ ownerId: userId }).exec(function (err, collection) {
            res.send(collection);
        });
    };
    
    exports.saveNewRecipe = function (req, res) {
        var currentUserId, queryForExisting,
            recipeData = req.body;
        
        // verify user is logged in as who they say they are
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        // verify this user doesn't have a recipe with the given name already
        queryForExisting = {
            ownerId: recipeData.ownerId,
            name: recipeData.name
        };
        
        Recipe.find(queryForExisting).exec(function (err, collection) {
            if (collection && collection.length === 0) {
                if (currentUserId === recipeData.ownerId) {
                    Recipe.create(recipeData, function (err) {
                        if (err) {
                            res.send({ reason: err.toString() });
                        }
                        
                        res.send(200);
                    });
                } else {
                    res.send(403, { reason: 'Not authorized' });
                }
            } else {
                res.send(500, { reason: 'A recipe with that name already exists!' });
            }
        });
    };
    
    exports.updateRecipe = function (req, res) {
        var currentUserId,
            recipeUpdates = req.body,
            query = { _id: recipeUpdates.id },
            update = {
                name: recipeUpdates.name,
                description: recipeUpdates.description,
                sourceName: recipeUpdates.sourceName,
                sourceUrl: recipeUpdates.sourceUrl
            },
            options = { multi: false };
        
        // verify the current user owns this recipe
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        Recipe.findOne(query).exec(function (err, recipe) {
            if (!!recipe && recipe.ownerId === currentUserId) {
                Recipe.update(query, update, options, function (err) {
                    if (err) {
                        res.send(500, { reason: err.toString() });
                    } else {
                        res.send(200);
                    }
                });
            } else {
                res.send(403, 'Not authorized');
            }
        });
    };
})();

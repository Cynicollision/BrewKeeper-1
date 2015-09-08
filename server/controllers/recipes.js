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
            res.send(recipe);
        });
    };
    
    exports.getRecipesByUserId = function (req, res) {
        var userId = req.params.id;
        
        Recipe.find({ ownerId: userId }).exec(function (err, collection) {
            res.send(collection);
        });
    };
    
    exports.saveNewRecipe = function (req, res) {
        var currentUserId,
            recipeData = req.body;
        
        // verify user is logged in as who they say they are
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        if (currentUserId === recipeData.ownerId) {
            Recipe.create(recipeData, function (err) {
                if (err) {
                    res.send({ reason: err.toString() });
                }
                
                res.send(200, { success: true });
            });
        } else {
            res.send(403, 'Not authorized');
        }
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

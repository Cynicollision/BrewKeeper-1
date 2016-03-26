(function () {
    'use strict';
    
    var mongoose = require('mongoose');

    var Recipe = mongoose.model('Recipe'),
        Brew = mongoose.model('Brew');
    
    exports.getRecipesByUserId = function (req, res) {

        var userId = req.params.id,
            limit = req.query.limit;
        
        // set a default limit if one is not specified
        if (!limit || limit <= 0) {
            limit = 1000;
        }
        
        var query = {
            ownerId: userId,
        };
        
        Recipe.find(query).sort({ name: 1 }).limit(limit).exec(function (err, collection) {
            res.send(collection);
        });
    };
    
    exports.getRecipeCountByUserId = function (req, res) {
        var userId = req.params.id;
        
        Recipe.count({ ownerId: userId }).exec(function (err, count) {
            res.send({
                count: count
            });
        });
    };

    exports.getRecipeById = function (req, res) {
        Recipe.findOne({ _id: req.params.id }).exec(function (err, recipe) {
            if (recipe) {
                res.send(recipe);
            } 
            else {
                var msg = 'Invalid recipe ID given.';
                if (req.params.id === "0") {
                    msg = 'This brew\'s recipe has been deleted.';
                }
                res.send(404, { reason: msg });
            }
        });
    };

    function sanitizeUndefinedRecipeValues(recipe) {

        if (recipe.sourceName === 'undefined') {
            recipe.sourceName = '';
        }
        if (recipe.sourceUrl === 'undefined') {
            recipe.sourceUrl = '';
        }
        if (recipe.description === 'undefined') {
            recipe.description = '';
        }
    }
    
    exports.saveNewRecipe = function (req, res) {
        var currentUserId, queryForExisting,
            recipeData = req.body;
        
        // verify user is logged in as the recipe's owner
        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
        
        sanitizeUndefinedRecipeValues(recipeData);
        
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
        
        sanitizeUndefinedRecipeValues(update);

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

    exports.deleteRecipe = function (req, res) {
        var currentUserId,
            deleteRecipeId = req.params.id,
            query = { _id: deleteRecipeId };

        if (!!req.user) {
            currentUserId = req.user._id.toString();
        }
       
        Recipe.findOne(query).exec(function (err, recipe) {
            if (!!recipe && recipe.ownerId === currentUserId) {
                
                // clear related brews' recipes
                var brewQuery = {
                    ownerId: currentUserId,
                    recipeId: deleteRecipeId,
                };
                Brew.update(brewQuery, { recipeId: "0" }, { multi: true }, function (err) {
                    if (err) {
                        console.log('Error updating brews from deleted recipe: ' + err);
                    }
                });

                Recipe.remove(query, function (err) {
                    if (err) {
                        res.send({ reason: err.toString() });
                    }

                    res.send(200);
                });
            } else {
                res.send(403, 'Not authorized');
            }
        });
    };

    exports.getRecipeBrewCountById = function (req, res) {

        var findRecipeId = req.params.id;
        Brew.count({ recipeId: findRecipeId }).exec(function (err, count) {
            if (err) {
                res.send(500, { reason: err.toString() });
            }
            
            res.send({
                count: count
            });
        });
    };

    exports.getTopRecipes = function (req, res) {
        // TODO: get the mode, sort desc by brew count, return top N
        //http://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array

        var currentUserId = req.user._id.toString(),
            recipeLimit = req.params.limit;
    };
})();

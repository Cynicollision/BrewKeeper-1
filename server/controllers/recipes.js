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

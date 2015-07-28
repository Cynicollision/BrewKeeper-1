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
    var recipeData = req.body;
    
    // TODO: verify sent ownerId === req.user._id.toString()
    
    Recipe.create(recipeData, function (err) {
        if (err) {
            res.send({ reason: err.toString() });
        }
        
        res.send(200);
    });
};

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

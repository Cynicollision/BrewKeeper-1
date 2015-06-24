var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    name: { type: String, required: '{PATH} is required!' },
    type: { type: String },
    source: { type: String },
    sourceUrl: {type: String }
});

var Recipe = mongoose.model('Recipe', recipeSchema);

function createDefaultRecipes() {
    Recipe.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Recipe.create({ name: "Brooklyn Brew Shop Everyday IPA", source: "Broolyn Brew Shop", sourceUrl: "http://google.com", type: "IPA" });
            Recipe.create({ name: "Brooklyn Brew Shop Summer Wheat", source: "Broolyn Brew Shop", sourceUrl: "http://google.com", type: "Wheat Ale" });
            Recipe.create({ name: "Perrysbrewer Midnight IPA", source: "Perrysbrewer", sourceUrl: "http://google.com", type: "IPA" });
            Recipe.create({ name: "Northern Brewer Radical Red", source: "Northern Brewer", sourceUrl: "http://google.com", type: "Red Ale" });
        }
    });
}

exports.createDefaultRecipes = createDefaultRecipes;

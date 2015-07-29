var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema( {
    ownerId: { type: String, required: '{PATH} is required!' },
    name: { type: String, required: '{PATH} is required!' },
    sourceName: String,
    sourceUrl: String,
    tags: [String]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

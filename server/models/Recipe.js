var mongoose = require('mongoose');

// TODO: add tags (string[])
var recipeSchema = mongoose.Schema( {
    ownerId: { type: String },
    name: { type: String, required: '{PATH} is required!' },
    sourceName: { type: String },
    sourceUrl: {type: String },
});

var Recipe = mongoose.model('Recipe', recipeSchema);


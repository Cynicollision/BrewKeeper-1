var mongoose = require('mongoose'),
    errRequired = '{PATH} is required!';

mongoose.model('Recipe', mongoose.Schema({
    ownerId: { type: String, required: '{PATH} is required!' },
    name: { type: String, required: '{PATH} is required!' },
    sourceName: String,
    sourceUrl: String,
    description: String
}));

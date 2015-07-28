var mongoose = require('mongoose');

var brewSchema = mongoose.Schema({
    name: { type: String, required: '{PATH} is required!' },
    brewedBy: { type: String, required: '{PATH} is required!'},
    featured: { type: Boolean },
    brewedOn: { type: Date, required: '{PATH} is required!' },
    tags: [String]
});

var Brew = mongoose.model('Brew', brewSchema);

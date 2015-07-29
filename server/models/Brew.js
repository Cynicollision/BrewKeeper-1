var mongoose = require('mongoose'),
    errRequired = '{PATH} is required!';

var brewSchema = mongoose.Schema({
    batchSize: { type: Number, required: errRequired },
    createdDate: { type: Date, required: errRequired },
    ownerId: { type: String, required: errRequired },
    statusCde: { type: Number, required: errRequired },
    description: String,
    brewDate: Date,
    bottleDate: Date,
    chillDate: Date,
    recipeId: String
});

var Brew = mongoose.model('Brew', brewSchema);

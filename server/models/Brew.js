var mongoose = require('mongoose'),
    errRequired = '{PATH} is required!';

mongoose.model('Brew', mongoose.Schema({
    batchSize: { type: Number, required: errRequired },
    createdDate: { type: Date, required: errRequired },
    ownerId: { type: String, required: errRequired },
    statusCde: { type: Number, required: errRequired },
    description: String,
    brewDate: Date,
    bottleDate: Date,
    chillDate: Date,
    recipeId: String
}));

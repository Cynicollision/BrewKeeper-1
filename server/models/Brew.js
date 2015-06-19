var mongoose = require('mongoose');

var brewSchema = mongoose.Schema({
    name: { type: String, required: '{PATH} is required!' },
    featured: { type: Boolean, required: '{PATH} is required!' },
    brewedOn: { type: Date, required: '{PATH} is required!' },
    tags: [String]
});

var Brew = mongoose.model('Brew', brewSchema);

function createDefaultBrews() {
    Brew.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Brew.create({ name: "Everyday IPA", featured: false, brewedOn: new Date('8/25/2014'), tags: ['hoppy', 'light'] });
            Brew.create({ name: "Bruxelles Blonde", featured: false, brewedOn: new Date('11/1/2014'), tags: ['light', 'crisp'] });
            Brew.create({ name: "Warrior Double IPA", featured: false, brewedOn: new Date('2/19/2015'), tags: ['hoppy', 'heavy'] });
            Brew.create({ name: "Summer Wheat", featured: true, brewedOn: new Date('4/23/2015'), tags: ['light', 'summery'] });
            Brew.create({ name: "American Wheat", featured: true, brewedOn: new Date('5/4/2015'), tags: ['light', 'crisp'] });
            Brew.create({ name: "Midnight IPA", featured: true, brewedOn: new Date('12/25/2014'), tags: ['hoppy', 'heavy'] });
            Brew.create({ name: "Black IPA", featured: false, brewedOn: new Date('3/16/2014'), tags: ['hoppy', 'dark'] });
        }
    });
}

exports.createDefaultBrews = createDefaultBrews;

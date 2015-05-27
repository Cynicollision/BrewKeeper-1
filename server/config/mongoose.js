var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    mongoose.connection.on('error', console.error.bind(console, 'connection error...'));
    mongoose.connection.once('open', function callback() {
        console.log('vast db online');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    //User.find({}).exec(function (err, collection) {
    //    if (collection.length === 0) {
    //        User.create({ username: "Sean", lastName: "Normoyle", username: "cynicollision" });
    //        User.create({ username: "Norman", lastName: "Seanmoyle", username: "happyjack825" });
    //    }
    //});
};

var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);
    mongoose.connection.on('error', console.error.bind(console, 'connection error...'));
    mongoose.connection.once('open', function callback() {
        console.log('vast db online');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    
    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    // create some sample users if none exist
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;

            salt = createSalt();
            hash = hashPwd(salt, 'password');
            User.create({ firstName: 'Sean', lastName: 'Normoyle', username: 'happyjack825', salt: salt, hashed_pwd: hash, roles: ['admin'] });
            
            salt = createSalt();
            hash = hashPwd(salt, 'cynical');
            User.create({ firstName: 'Herp', lastName: 'Derpington', username: 'cynical', salt: salt, hashed_pwd: hash, roles: [] });

            salt = createSalt();
            hash = hashPwd(salt, 'dan');
            User.create({ firstName: 'Dan', lastName: 'Derp', username: 'dan', salt: salt, hashed_pwd: hash });
        }
    });
};


function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}
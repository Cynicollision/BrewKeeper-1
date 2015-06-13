var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');


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
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'password');
            User.create({ firstName: 'Sean', lastName: 'Normoyle', username: 'happyjack825', salt: salt, hashed_pwd: hash, roles: ['admin'] });
            
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'cynical');
            User.create({ firstName: 'Herp', lastName: 'Derpington', username: 'cynical', salt: salt, hashed_pwd: hash, roles: [] });
            
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'dan');
            User.create({ firstName: 'Dan', lastName: 'Derp', username: 'dan', salt: salt, hashed_pwd: hash });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
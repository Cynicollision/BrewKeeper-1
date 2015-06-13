var passport = require('passport');

exports.authenticate = function (req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            res.send({ success: false });
        }
        
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            
            // TODO: do not send hashed_pwd and salt with user to UI... probably only need name + username
            res.send({ success: true, user: user });
        });
    });
    
    auth(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    };
};

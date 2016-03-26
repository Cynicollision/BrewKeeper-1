(function () {
    'use strict';

    var passport = require('passport');
    
    exports.authenticate = function (req, res, next) {

        if (!req.body.username) {
            res.send(400, 'Bad login request.');
        }
        else {
            req.body.username = req.body.username.toLowerCase();

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
                    
                    var clientUser = {
                        _id: user._id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                    
                    res.send({ success: true, user: clientUser });
                });
            });
            
            auth(req, res, next);
        }
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
})();

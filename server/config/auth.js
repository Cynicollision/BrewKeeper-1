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
            
            // TODO: do not send hashed_pwd and salt with user.
            res.send({ success: true, user: user });
        });
    });
    
    auth(req, res, next);
};
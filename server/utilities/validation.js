(function () {
    'use strict';

    module.exports = {
        validateUserRequest: function (req, res, reqUserId) {
            
            function returnInvalid(code, msg) {
                res.send(code, msg);
                return false;
            }
            
            if (!req.user) {
                return returnInvalid(403, 'Not logged in.')
            }
            
            if (reqUserId && reqUserId !== req.user._id.toString()) {
                return returnInvalid(403, 'Not logged in as user specified in request.');
            }
            
            return true;
        }
    }
})();

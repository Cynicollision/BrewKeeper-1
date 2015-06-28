angular.module('app').factory('mvIdentity', function ($window, mvUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

    return {
        currentUser: currentUser,
        
        getCurrentUserId: function () {
            if (currentUser) {
                return currentUser._id;
            }
            
            return -1;
        },

        isAuthenticated: function () {
            return !!this.currentUser;
        },

        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
        }
    };
});
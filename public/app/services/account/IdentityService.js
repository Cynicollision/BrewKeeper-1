angular.module('app').service('IdentityService', function ($window, mvUser) {
    this.currentUser = null;
    if (!!$window.bootstrappedUserObject) {
        this.currentUser = new mvUser();
        angular.extend(this.currentUser, $window.bootstrappedUserObject);
    }

    this.getCurrentUserId = function () {
        if (!!this.currentUser) {
            return this.currentUser._id;
        }
            
        return -1;
    };

    this.isAuthenticated = function () {
        return !!this.currentUser;
    };

    this.isAuthorized = function (role) {
        return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1;
    };
});
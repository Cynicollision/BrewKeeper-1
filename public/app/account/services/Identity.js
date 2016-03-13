(function () {
    'use strict';

    angular.module('BrewKeeper').service('Identity',
        ['$window', 'User',
        function ($window, User) {

            this.currentUser = null;

            this.bootstrapCurrentUserFromWindow = function () {

                if (!!$window.bkCurrentUser) {
                    this.currentUser = new User();
                    angular.extend(this.currentUser, $window.bkCurrentUser);
                }
            };
        
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
                return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
            };
        
            this.bootstrapCurrentUserFromWindow();
        }
    ]);
})();

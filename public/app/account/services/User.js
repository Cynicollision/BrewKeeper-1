(function () {
    'use strict';

    var bk = angular.module('BrewKeeper');
    bk.factory('User', ['$resource', 
        function ($resource) {
            var UserResource = $resource('/api/users/:id', { _id: "@id" });
        
            UserResource.prototype.isAdmin = function () {
                return this.roles && this.roles.indexOf('admin') > -1;
            };
        
            return UserResource;
        }
    ]);
})();

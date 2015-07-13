angular.module('app').factory('mvAuth', function ($http, $q, IdentityService, mvUser, mvDefaultRequest) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: '/login',
                data: {
                    username: username,
                    password: password
                },
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    IdentityService.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },
        
        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();
            
            $http({
                method: 'POST',
                url: '/api/users',
                data: newUserData,
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function () {
                IdentityService.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        
        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(IdentityService.currentUser);
            angular.extend(clone, newUserData);
            
            $http({
                method: 'PUT',
                url: '/api/users',
                data: newUserData,
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function () {
                IdentityService.currentUser = clone;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: '/logout',
                data: {
                    logout: true
                },
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function () {
                IdentityService.currentUser = undefined;
                dfd.resolve();
            });

            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (IdentityService.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute: function () {
            if (IdentityService.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});

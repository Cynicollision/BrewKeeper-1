(function () {
    'use strict';

    angular.module('BrewKeeper').factory('Auth', function ($q, BrewKeeperApi, Identity, User) {
        return {
            authenticateUser: function (username, password) {
                var dfd = $q.defer(),
                    credentials = {
                        username: username,
                        password: password
                    };
                
                BrewKeeperApi.post('/login', credentials).then(function (response) {
                    if (response.data.success) {
                        var user = new User();
                        angular.extend(user, response.data.user);
                        Identity.currentUser = user;
                        dfd.resolve(response.data);
                    } else {
                        dfd.resolve(false);
                    }
                });
                
                return dfd.promise;
            },
            
            createUser: function (newUserData) {
                var dfd = $q.defer(),
                    newUser = new User(newUserData);
                
                BrewKeeperApi.post('/api/users/', newUserData).then(function () {
                    Identity.currentUser = newUser;
                    dfd.resolve(true);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            updateCurrentUser: function (updatedUserData) {
                var dfd = $q.defer(),
                    updatedUser = angular.copy(Identity.currentUser);
                
                angular.extend(updatedUser, updatedUserData);
                BrewKeeperApi.put('/api/users/', updatedUserData).then(function () {
                    Identity.currentUser = updatedUser;
                    dfd.resolve(true);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            logoutUser: function () {
                var dfd = $q.defer();
                
                BrewKeeperApi.post('/logout', {
                    logout: true
                }).then(function (response) {
                    Identity.currentUser = undefined;
                    dfd.resolve(true);
                });
                
                return dfd.promise;
            },
            
            authorizeCurrentUserForRoute: function (role) {
                if (Identity.isAuthorized(role)) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            },
            
            authorizeAuthenticatedUserForRoute: function () {
                if (Identity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            }
        };
    });
})();

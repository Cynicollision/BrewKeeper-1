(function () {
    'use strict';

    angular.module('BrewKeeper').factory('Brew', function ($q, BrewKeeperApi, Identity) {
        return {
            isBrewOwnedByCurrentUser: function (brew) {
                if (brew) {
                    return (Identity.getCurrentUserId() === brew.ownerId);
                }
                
                return false;
            },
            
            getAll: function () {
                var dfd = $q.defer();
                
                BrewKeeperApi.get('/api/brew/').then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            getByUserId: function (userId) {
                var dfd = $q.defer(),
                    url = '/api/brew/user/' + userId;
                
                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            getByBrewId: function (brewId) {
                var dfd = $q.defer(),
                    url = '/api/brew/' + brewId;
                
                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            save: function (newBrewData) {
                var dfd = $q.defer();
                
                BrewKeeperApi.post('/api/brew/', newBrewData).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            update: function (updatedBrewData) {
                var dfd = $q.defer();
                
                BrewKeeperApi.put('/api/brew/', updatedBrewData).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            remove: function (brewId) {
                var dfd = $q.defer(),
                    url = '/api/brew/' + brewId;
                
                BrewKeeperApi.delete(url).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            }
        };
    });
})();

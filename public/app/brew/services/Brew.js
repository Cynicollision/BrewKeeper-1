(function () {
    'use strict';

    angular.module('BrewKeeper').factory('Brew', function ($q, BrewKeeperApi, Identity) {
        return {
            isBrewOwnedByUser: function (brew, userId) {
                if (brew) {
                    return (userId === brew.ownerId);
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
            
            getByUserId: function (userId, limit) {
                var dfd = $q.defer(),
                    url;

                if (!limit) {
                    limit = -1;
                }
                
                url = '/api/brew/user/' + userId + '/' + limit;
                
                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            getCountByUserId: function (userId) {
                var dfd = $q.defer(),
                    url = '/api/brew/user/count/' + userId;

                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (reason) {
                    dfd.reject(reason);
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

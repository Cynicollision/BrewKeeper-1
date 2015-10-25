(function () {
    'use strict';

    angular.module('BrewKeeper').factory('Recipe', function ($q, BrewKeeperApi, Identity) {
        return {
            isRecipeOwnedByUser: function (recipe, userId) {
                if (recipe) {
                    return (userId === recipe.ownerId);
                }
                
                return false;
            },
            
            getAll: function () {
                var dfd = $q.defer();
                
                BrewKeeperApi.get('/api/recipe/').then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            getByUserId: function (userId) {
                var dfd = $q.defer(),
                    url = '/api/recipe/user/' + userId;
                
                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            getByRecipeId: function (recipeId) {
                var dfd = $q.defer(),
                    url = '/api/recipe/' + recipeId;
                
                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            save: function (newRecipeData) {
                var dfd = $q.defer();
                
                BrewKeeperApi.post('/api/recipe/', newRecipeData).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            update: function (updatedRecipeData) {
                var dfd = $q.defer();
                
                BrewKeeperApi.put('/api/recipe/', updatedRecipeData).then(function (response) {
                    dfd.resolve(response);
                }, function (response) {
                    dfd.reject(response.data.reason);
                });
                
                return dfd.promise;
            },
            
            remove: function (recipeId) {
                var dfd = $q.defer(),
                    url = '/api/recipe/' + recipeId;
                
                BrewKeeperApi.delete(url).then(function (response) {
                    dfd.resolve(response);
                }, function (reason) {
                    dfd.reject(reason);
                });
                
                return dfd.promise;
            },
            
            getCount: function (recipeId) {
                var dfd = $q.defer(),
                    url = '/api/recipe/count/' + recipeId;
                
                BrewKeeperApi.get(url).then(function (response) {
                    dfd.resolve(response);
                }, function (reason) {
                    dfd.reject(reason);
                });
                
                return dfd.promise;
            }
        };
    });

})();

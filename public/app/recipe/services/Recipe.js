﻿(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper');
    bk.factory('Recipe', ['$q', 'BrewKeeperApi', 
        function ($q, BrewKeeperApi) {
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
            
                getByUserId: function (userId, limit) {
                    var dfd = $q.defer(),
                        url = '/api/recipe/user/' + userId;
                    
                    limit = limit || 0;
                    url += '?limit=' + limit;
                
                    BrewKeeperApi.get(url).then(function (response) {
                        dfd.resolve(response);
                    }, function (response) {
                        dfd.reject(response.data.reason);
                    });
                
                    return dfd.promise;
                },
            
                getCountByUserId: function (userId) {
                    var dfd = $q.defer(),
                        url = '/api/recipe/user/count/' + userId;
                
                    BrewKeeperApi.get(url).then(function (response) {
                        dfd.resolve(response);
                    }, function (reason) {
                        dfd.reject(reason);
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
            
                getBrewCount: function (recipeId) {
                    var dfd = $q.defer(),
                        url = '/api/recipe/count/' + recipeId;
                
                    BrewKeeperApi.get(url).then(function (response) {
                        dfd.resolve(response);
                    }, function (reason) {
                        dfd.reject(reason);
                    });
                
                    return dfd.promise;
                },

                getTopBrewedRecipes: function (userId, limit) {
                    var dfd = $q.defer(),
                        url = '/api/recipe/user/top/' + userId;
                    
                    limit = limit || 0;
                    
                    url += '?limit=' + limit;

                    BrewKeeperApi.get(url).then(function (response) {
                        dfd.resolve(response);
                    }, function (reason) {
                        dfd.resolve(reason);
                    });

                    return dfd.promise;
                }
            };
        }
    ]);
})();

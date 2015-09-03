angular.module('BrewKeeper').factory('Recipe', function ($q, BrewKeeperApi) {
    return {
        getAll: function () {
            var dfd = $q.defer();
            
            BrewKeeperApi.get('/api/recipes/').then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },

        getByUserId: function (userId) {
            var dfd = $q.defer(),
                url = '/api/recipes/user/' + userId;
            
            BrewKeeperApi.get(url).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },

        getByRecipeId: function (recipeId) {
            var dfd = $q.defer(),
                url = '/api/recipes/' + recipeId;
            
            BrewKeeperApi.get(url).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },

        save: function (newRecipeData) {
            var dfd = $q.defer();
            
            BrewKeeperApi.post('/api/recipes/', newRecipeData).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
    };
});

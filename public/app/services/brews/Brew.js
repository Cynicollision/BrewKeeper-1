angular.module('app').factory('Brew', function ($resource, $http, $q, BrewKeeperApi) {
    return {
        getAll: function () {
            return BrewKeeperApi.get('/api/brews/');
        },
        
        getByUserId: function (userId) {
            return BrewKeeperApi.get('/api/brews/user/' + userId);
        },
        
        getByBrewId: function (brewId) {
            return BrewKeeperApi.get('/api/brews/' + brewId);
        },
        
        save: function (newBrewData) {
            return BrewKeeperApi.post('/api/brews/', newBrewData);
        },

        update: function (updatedBrewData) {
            return BrewKeeperApi.put('/api/brews/', updatedBrewData);
        }
    };
});

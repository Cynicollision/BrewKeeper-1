angular.module('app').factory('Brew', function ($resource, $http, $q, BrewKeeperApi) {
    return {
        // TODO: consolidate getter names: query -> get, getForUser/getByUserId, getById
        query: function () {
            return BrewKeeperApi.send('GET', '/api/brews');
        },
        
        queryForUser: function (userId) {
            return BrewKeeperApi.send('GET', '/api/brews/user/' + userId);
        },
        
        getById: function (brewId) {
            return BrewKeeperApi.send('GET', '/api/brews/' + brewId);
        },
        
        save: function (newBrewData) {
            return BrewKeeperApi.send('POST', '/api/brews', newBrewData);
        }
    };
});

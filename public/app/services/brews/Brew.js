angular.module('BrewKeeper').factory('Brew', function ($q, BrewKeeperApi, Identity) {
    return {
        isBrewOwnedByCurrentUser: function (brew) {
            console.log(Identity.getCurrentUserId());
            return (Identity.getCurrentUserId() === brew.ownerId);
        },

        getAll: function () {
            var dfd = $q.defer();

            BrewKeeperApi.get('/api/brews/').then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        
        getByUserId: function (userId) {
            var dfd = $q.defer(),
                url = '/api/brews/user/' + userId;

            BrewKeeperApi.get(url).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        
        getByBrewId: function (brewId) {
            var dfd = $q.defer(),
                url = '/api/brews/' + brewId;

            BrewKeeperApi.get(url).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        
        save: function (newBrewData) {
            var dfd = $q.defer();
            
            BrewKeeperApi.post('/api/brews/', newBrewData).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        update: function (updatedBrewData) {
            var dfd = $q.defer();

            BrewKeeperApi.put('/api/brews/', updatedBrewData).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        delete: function (brewId) {
            var dfd = $q.defer(),
                url = '/api/brews/' + brewId;
            
            BrewKeeperApi.delete(url).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});

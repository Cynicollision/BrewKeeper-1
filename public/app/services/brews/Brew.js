angular.module('app').factory('Brew', function ($resource, $http, $q, mvDefaultRequest) {
    return {
        // TODO: consolidate getter names: query -> get, getForUser/getByUserId, getById
        query: function () {
            var dfd = $q.defer();
            
            $http({
                method: 'GET',
                isArray: false,
                url: '/api/brews',
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        
        queryForUser: function (userId) {
            var dfd = $q.defer();
           
            $http({
                method: 'GET',
                isArray: false,
                url: '/api/brews/user/' + userId,
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        
        getById: function (brewId) {
            var dfd = $q.defer();
            
            $http({
                method: 'GET',
                isArray: false,
                url: '/api/brews/' + brewId,
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },
        
        save: function (newBrewData) {
            var dfd = $q.defer();
            
            $http({
                method: 'POST',
                isArray: false,
                url: '/api/brews',
                data: newBrewData,
                transformRequest: mvDefaultRequest.transform,
                headers: mvDefaultRequest.headers
            }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});

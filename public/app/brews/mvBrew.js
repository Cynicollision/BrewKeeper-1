angular.module('app').factory('mvBrew', function ($resource, $http, $q, mvDefaultRequest) {
    return {
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

angular.module('app').factory('mvBrew', function ($resource, $http, $q) {
    return {
        query: function () {
            var dfd = $q.defer();
            
            $http({
                method: 'GET',
                isArray: false,
                url: '/api/brews',
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});

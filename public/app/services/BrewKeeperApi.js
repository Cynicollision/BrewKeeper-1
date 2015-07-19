angular.module('app').factory('BrewKeeperApi', function ($http, $q) {
    var dfd, transform = function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    return {
        get: function (url) {
            dfd = $q.defer();
                
            $http({
                method: 'GET',
                isArray: false,
                url: url,
                transformRequest: transform,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                dfd.resolve(response);
            }, function (response) {
                dfd.reject(response.data.reason);
            });
                
            return dfd.promise;
        },
        
        post: function (url, data) {
            dfd = $q.defer();
            
            $http({
                method: 'POST',
                isArray: false,
                url: url,
                data: data,
                transformRequest: transform,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        },

        put: function (url, data) {
            dfd = $q.defer();
            
            $http({
                method: 'PUT',
                isArray: false,
                url: url,
                data: data,
                transformRequest: transform,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            
            return dfd.promise;
        }
    };
});

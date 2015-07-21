angular.module('BrewKeeper').factory('BrewKeeperApi', function ($http) {
    var transform = function (obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    return {
        get: function (url) {
            return $http({
                method: 'GET',
                isArray: false,
                url: url,
                transformRequest: transform,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        },
        
        post: function (url, data) {
            return $http({
                method: 'POST',
                isArray: false,
                url: url,
                data: data,
                transformRequest: transform,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        },

        put: function (url, data) {
            return $http({
                method: 'PUT',
                isArray: false,
                url: url,
                data: data,
                transformRequest: transform,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    };
});

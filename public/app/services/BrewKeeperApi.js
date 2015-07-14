angular.module('app').factory('BrewKeeperApi', function ($http, $q) {
    return {
        send: function (word, url, data) {
            var transform = function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            };

            switch (word) {
                case 'GET':
                    {
                        if (!!word && !!url) {
                            var dfd = $q.defer();
                            
                            $http({
                                method: word,
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
                        } else {
                            throw 'Malformed request';
                        }
                    }
                case 'POST':
                    {
                        var dfd = $q.defer();
                        
                        $http({
                            method: 'POST',
                            isArray: false,
                            url: '/api/brews',
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
            }
        }
    };
});

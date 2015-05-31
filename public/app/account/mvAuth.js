angular.module('app').factory('mvAuth', function ($http, $q, mvIdentity, mvUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: 'login',
                data: {
                    username: username,
                    password: password
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http({
                method: 'POST',
                url: 'logout',
                data: {
                    logout: true
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });

            return dfd.promise;
        }
    };
});
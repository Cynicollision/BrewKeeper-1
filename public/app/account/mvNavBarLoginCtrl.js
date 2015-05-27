angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http) {
    $scope.signin = function (username, password) {
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
                console.log('Logged in!');
            } else {
                console.log('Failed to log in.');
            }
        });
    };
});

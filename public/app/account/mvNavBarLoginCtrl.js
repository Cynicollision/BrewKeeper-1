angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, $location, Identity, Notifier, mvAuth) {
    $scope.identity = Identity;

    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                Notifier.notify('Sign in successful!');
            } else {
                Notifier.error('Username/password incorrect.');
            }
        });
    };

    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            Notifier.notify('You have successfully logged out');
            $location.path('/');
        });
    };
});

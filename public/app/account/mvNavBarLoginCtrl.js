angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, $location, Identity, mvNotifier, mvAuth) {
    $scope.identity = Identity;

    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mvNotifier.notify('Sign in successful!');
            } else {
                mvNotifier.notify('Username/password incorrect.');
            }
        });
    };

    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully logged out');
            $location.path('/');
        });
    };
});

angular.module('BrewKeeper').controller('NavBarLoginCtrl', function ($scope, $http, $location, Auth, Identity, Notifier) {
    $scope.identity = Identity;

    $scope.signin = function (username, password) {
        Auth.authenticateUser(username, password).then(function (success) {
            if (success) {
                Notifier.notify('Sign in successful!');
            } else {
                Notifier.error('Username/password incorrect.');
            }
        });
    };

    $scope.signout = function () {
        Auth.logoutUser().then(function () {
            $scope.clearCurrentUser();
            Notifier.notify('You have successfully logged out');
            $location.path('/');
        });
    };

    $scope.clearCurrentUser = function () {
        $scope.username = "";
        $scope.password = "";
    };
});

angular.module('BrewKeeper').controller('MainCtrl', function ($scope, Auth, Identity, Notifier) {
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
});

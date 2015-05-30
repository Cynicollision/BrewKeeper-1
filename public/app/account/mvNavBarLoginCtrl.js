angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, mvIdentity, mvNotifier, mvAuth) {
    
    $scope.identity = mvIdentity;

    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mvNotifier.notify('Sign in successful!');
            } else {
                mvNotifier.notify('Username/password incorrect.');
            }
        });
    };
});

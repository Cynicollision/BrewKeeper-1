﻿angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, $location, Identity, Notifier, Auth) {
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
            $scope.username = "";
            $scope.password = "";
            Notifier.notify('You have successfully logged out');
            $location.path('/');
        });
    };
});

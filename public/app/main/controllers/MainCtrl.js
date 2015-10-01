﻿angular.module('BrewKeeper').controller('MainCtrl', function ($scope, Auth, Identity, Notifier) {
    $scope.identity = Identity;

    $scope.signin = function (username, password) {
        Auth.authenticateUser(username, password).then(function (success) {
            if (!success) {
                Notifier.error('Username/password incorrect.');
            }
        });

        // TODO: BaseCtrl.shutNavBar()
        if ($('.navbar-collapse') && $('.navbar-collapse').collapse) {
            $('.navbar-collapse').collapse('hide');
        }
    };
});

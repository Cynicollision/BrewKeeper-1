(function () {
    'use strict';

    angular.module('BrewKeeper').controller('SignupCtrl', function ($scope, $location, Auth, Notifier) {
        $scope.getNewUserData = function () {
            return {
                username: $scope.username,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            };
        };
        
        $scope.signup = function () {
            var newUserData = $scope.getNewUserData();
            Auth.createUser(newUserData).then(function () {
                $scope.successRedirect();
            }, function (reason) {
                Notifier.error(reason);
            });
        };

        $scope.successRedirect = function () {
            Notifier.notify('User account created!');
            $location.path('/');
        };
    });
})();

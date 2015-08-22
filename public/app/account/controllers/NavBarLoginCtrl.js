(function () {
    'use strict';

    angular.module('BrewKeeper').controller('NavBarLoginCtrl', function ($scope, $location, Auth, Identity, Notifier) {
        $scope.identity = Identity;
        
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
})();
    
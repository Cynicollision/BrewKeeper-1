(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper');
    bk.controller('NavBarLoginCtrl', ['$scope', '$location', 'Auth', 'Identity', 'Notifier',
        function ($scope, $location, Auth, Identity, Notifier) {
            $scope.identity = Identity;
        
            $scope.signout = function () {
                Auth.logoutUser().then(function () {
                    $scope.clearCurrentUser();
                    $('.navbar-collapse').collapse('hide');
                    Notifier.notify('Logged out');
                    $location.path('/');
                });
            };
        
            $scope.clearCurrentUser = function () {
                $scope.username = "";
                $scope.password = "";
            };
        }]
    );
})();
    
(function () {
    'use strict';

    angular.module('BrewKeeper').controller('SignupCtrl', 
        
        ['$scope', '$location', 'Auth', 'Notifier',
        function ($scope, $location, Auth, Notifier) {

            function getNewUserData() {
                return {
                    username: $scope.username,
                    password: $scope.password,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName
                };
            }
        
            $scope.signup = function () {

                var newUserData = getNewUserData();

                Auth.createUser(newUserData).then(function () {

                    Auth.authenticateUser(newUserData.username, newUserData.password).then(function () {
                        Notifier.notify('User account created!');
                        $location.path('/');
                    }, function (reason) {
                        Notifier.error(reason);
                    });
                }, function (reason) {
                    Notifier.error(reason);
                });
            
                // collapse the navbar
                if ($('.navbar-collapse') && $('.navbar-collapse').collapse) {
                    $('.navbar-collapse').collapse('hide');
                }
            };
        }
    ]);
})();

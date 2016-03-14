(function () {
    'use strict';

    angular.module('BrewKeeper').controller('MainCtrl', 

        ['$scope', '$location', 'Auth', 'Identity', 'Notifier',
        function ($scope, $location, Auth, Identity, Notifier) {

            $scope.identity = Identity;
        
            $scope.signin = function (username, password) {

                Auth.authenticateUser(username, password).then(function (success) {
                    if (success) {
                        $location.path('/home');
                    }
                    else {
                        Notifier.error('Username/password incorrect.');
                    }
                });
            
                // collapse the navbar
                if ($('.navbar-collapse') && $('.navbar-collapse').collapse) {
                    $('.navbar-collapse').collapse('hide');
                }
            };

            if (Identity.isAuthenticated()) {
                $location.path('/home');
            }
        }
    ]);
})();

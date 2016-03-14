(function () {
    'use strict';

    angular.module('BrewKeeper').controller('MainCtrl', 

        ['$scope', 'Auth', 'Identity', 'Notifier',
        function ($scope, Auth, Identity, Notifier) {

            $scope.identity = Identity;
        
            $scope.signin = function (username, password) {

                Auth.authenticateUser(username, password).then(function (success) {
                    if (!success) {
                        Notifier.error('Username/password incorrect.');
                    }
                });
            
                // collapse the navbar
                if ($('.navbar-collapse') && $('.navbar-collapse').collapse) {
                    $('.navbar-collapse').collapse('hide');
                }
            };
        }
    ]);
})();

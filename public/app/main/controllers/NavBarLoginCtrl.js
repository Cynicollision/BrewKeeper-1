(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('NavBarLoginCtrl', 

        ['$scope', '$location', 'Auth', 'Identity', 'Notifier',
        function ($scope, $location, Auth, Identity, Notifier) {
            
            $scope.identity = Identity;
            
            function clearCurrentUser() {
                $scope.username = "";
                $scope.password = "";
            }
            
            $scope.signout = function () {

                Auth.logoutUser().then(function () {
                    clearCurrentUser();
                    $('.navbar-collapse').collapse('hide');
                    Notifier.notify('Logged out');
                    $location.path('/');
                });
            };
        }]
    );
})();

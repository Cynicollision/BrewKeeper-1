(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('EditProfileCtrl', 
        
        ['$scope', '$location', 'BaseCtrl', 'Auth', 'Identity', 'Notifier',
        function ($scope, $location, BaseCtrl, Auth, Identity, Notifier) {
        
            function setScopeInitialUserData($scope, user) {
                $scope.username = user.username;
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
            }
        
            function getScopeUpdatedUserData() {
                return {
                    username: $scope.username,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                };
            }
        
            $scope.submit = function () {

                var updatedUserData = getScopeUpdatedUserData();
            
                if ($scope.password && $scope.password.length > 0) {
                    updatedUserData.password = $scope.password;
                }
            
                Auth.updateCurrentUser(updatedUserData).then(function () {
                    Notifier.notify('Your profile has been updated.');
                    $location.path('/');
                }, function (reason) {
                    Notifier.error(reason);
                });
            };
        
            // initialize
            BaseCtrl.init($scope, function ($scope) {
                setScopeInitialUserData($scope, Identity.currentUser);
            });
        }
    ]);
})();

(function () {
    'use strict';

    angular.module('BrewKeeper').controller('EditProfileCtrl', function ($scope, Auth, Identity, Notifier) {
        
        $scope.setScopeInitialUserData = function (user) {
            $scope.email = user.username;
            $scope.fname = user.firstName;
            $scope.lname = user.lastName;
        };
        
        $scope.getScopeUpdatedUserData = function () {
            return {
                username: $scope.email,
                firstName: $scope.fname,
                lastName: $scope.lname
            };
        };
        
        $scope.update = function () {
            var updatedUserData = $scope.getScopeUpdatedUserData();
            
            if ($scope.password && $scope.password.length > 0) {
                updatedUserData.password = $scope.password;
            }
            
            Auth.updateCurrentUser(updatedUserData).then(function () {
                Notifier.notify('Your user account has been updated.');
            }, function (reason) {
                Notifier.error(reason);
            });
        };
        
        // initialize
        $scope.setScopeInitialUserData(Identity.currentUser);
    });
})();

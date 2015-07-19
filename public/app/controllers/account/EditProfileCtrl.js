angular.module('app').controller('EditProfileCtrl', function ($scope, Auth, Identity, Notifier) {
    $scope.email = Identity.currentUser.username;
    $scope.fname = Identity.currentUser.firstName;
    $scope.lname = Identity.currentUser.lastName;

    $scope.update = function () {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        
        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }
        
        Auth.updateCurrentUser(newUserData).then(function () {
            Notifier.notify('Your user account has been updated.');
        }, function (reason) {
            Notifier.error(reason);
        });
    };
});
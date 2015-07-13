angular.module('app').controller('mvProfileCtrl', function ($scope, mvAuth, Identity, mvNotifier) {
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
        
        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Your user account has been updated.');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});
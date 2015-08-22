angular.module('BrewKeeper').controller('SignupCtrl', function ($scope, $location, User, Auth, Notifier) {
    $scope.signup = function () {
        var newUserData = {
            username: $scope.username,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        
        Auth.createUser(newUserData).then(function () {
            Notifier.notify('User account created!');
            $location.path('/');
        }, function (reason) {
            Notifier.error(reason);
        });
    };
});
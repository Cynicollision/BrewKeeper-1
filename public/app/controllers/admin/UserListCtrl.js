angular.module('BrewKeeper').controller('UserListCtrl', function ($scope, User) {
    $scope.users = User.query();
});
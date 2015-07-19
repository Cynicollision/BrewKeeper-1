angular.module('app').controller('UserListCtrl', function ($scope, User) {
    $scope.users = User.query();
});
angular.module('app').controller('mvMainCtrl', function ($scope, mvBrew) {
    $scope.brews = mvBrew.query();
});
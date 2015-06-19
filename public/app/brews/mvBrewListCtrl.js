angular.module('app').controller('mvBrewListCtrl', function ($scope, mvBrew) {
    $scope.brews = mvBrew.query();
});
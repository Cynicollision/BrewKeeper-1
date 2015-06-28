angular.module('app').controller('mvMainCtrl', function ($scope, mvCachedBrews) {
    $scope.brews = mvCachedBrews.query();
});

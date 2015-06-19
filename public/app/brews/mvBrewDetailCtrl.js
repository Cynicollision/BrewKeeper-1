angular.module('app').controller('mvBrewDetailCtrl', function ($scope, mvBrew, $routeParams) {
    $scope.brew = mvBrew.get({ _id: $routeParams.id });
});
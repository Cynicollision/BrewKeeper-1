angular.module('app').controller('BrewDetailCtrl', function ($scope, $routeParams, Brew, Identity) {
    $scope.getBrew = function (brewId) {
        Brew.getByBrewId(brewId).then(function (response) {
            $scope.setCurrentBrew(response.data);
        });
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brew = brew;
    };
    
    $scope.getBrew($routeParams.id);
});

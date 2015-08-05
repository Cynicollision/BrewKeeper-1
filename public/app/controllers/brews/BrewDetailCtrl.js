angular.module('BrewKeeper').controller('BrewDetailCtrl', function ($scope, $routeParams, $timeout, Brew, Identity) {
    $scope.getBrew = function (brewId) {
        Brew.getByBrewId(brewId).then(function (response) {
            $scope.setCurrentBrew(response.data);
        });
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brew = brew;
    };
    
    $scope.isBrewOwner = function () { 
        return (!!$scope.brew && Identity.getCurrentUserId() === $scope.brew.ownerId);
    };

    $scope.getBrew($routeParams.id);
});

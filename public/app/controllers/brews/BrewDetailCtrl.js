angular.module('BrewKeeper').controller('BrewDetailCtrl', function ($scope, $routeParams, $timeout, $window, Brew, BrewStatus, Identity) {
    $scope.statusLookup = BrewStatus;

    $scope.getBrew = function (brewId) {
        Brew.getByBrewId(brewId).then(function (response) {
            $scope.setCurrentBrew(response.data);
        });
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brew = brew;
    };
    
    // TODO: should be in Brew service
    $scope.isBrewOwner = function () { 
        return (!!$scope.brew && Identity.getCurrentUserId() === $scope.brew.ownerId);
    };
    
    $scope.doEdit = function () {
        $window.location = '/brews/edit/' + $scope.brew._id;
    };
    
    $scope.doDelete = function () {
        $window.location = '/brews/delete/' + $scope.brew._id;
    };
    
    // initialize
    $scope.getBrew($routeParams.id);
});

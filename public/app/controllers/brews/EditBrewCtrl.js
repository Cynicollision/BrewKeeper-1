angular.module('BrewKeeper').controller('EditBrewCtrl', function ($scope, $filter, $routeParams, $location, Brew, Notifier) {
    $scope.getBrew = function (brewId) {
        Brew.getByBrewId(brewId).then(function (response) {
            $scope.setCurrentBrew(response.data);
        });
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brewId = brew._id;
        $scope.name = brew.name;
        $scope.brewedOn = $filter('date')(brew.brewedOn, 'shortDate');
    };
    
    $scope.getBrewUpdateData = function () {
        return {
            id: $scope.brewId,
            name: $scope.name,
            brewedOn: $scope.brewedOn
        };
    };
    
    $scope.update = function () {
        var newBrewData = $scope.getBrewUpdateData(),
            url = '/brews/' + $scope.brewId;
        
        Brew.update(newBrewData).then(function () {
            Notifier.notify('Brew updated.');
            $location.path(url);
        }, function (reason) {
            Notifier.error(reason);
        });
    };

    $scope.getBrew($routeParams.id);
});
(function () {
    'use strict';

    angular.module('BrewKeeper').controller('ViewBrewCtrl', function ($scope, $routeParams, $timeout, $window, Brew, BrewStatus) {
        $scope.statusLookup = BrewStatus;
        $scope.brewSvc = Brew;
        
        $scope.getBrew = function (brewId) {
            Brew.getByBrewId(brewId).then(function (response) {
                $scope.setCurrentBrew(response.data);
            });
        };
        
        $scope.setCurrentBrew = function (brew) {
            $scope.brew = brew;
        };
        
        $scope.doEdit = function () {
            $window.location = '/brew/edit/' + $scope.brew._id;
        };
        
        $scope.doDelete = function () {
            $window.location = '/brew/delete/' + $scope.brew._id;
        };
        
        // initialize
        $scope.getBrew($routeParams.id);
    });
})();

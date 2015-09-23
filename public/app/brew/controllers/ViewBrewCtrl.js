(function () {
    'use strict';

    angular.module('BrewKeeper').controller('ViewBrewCtrl', function ($scope, $routeParams, $location, $window, Brew, BrewStatus, Notifier, Recipe) {
        $scope.statusLookup = BrewStatus;
        $scope.brewSvc = Brew;
        
        $scope.getBrew = function (brewId) {
            Brew.getByBrewId(brewId).then(function (response) {
                $scope.setCurrentBrew(response.data);
                $scope.getRecipeName(response.data.recipeId);
            }, function (response) {
                Notifier.error(response);
                $location.path('/brew');
            });
        };
        
        $scope.getRecipeName = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                $scope.recipeName = response.data.name;
            }, function (response) {
                Notifier.error(response);
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
        $scope.recipeName = '';
    });
})();

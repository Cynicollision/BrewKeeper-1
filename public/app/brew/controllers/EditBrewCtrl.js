(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper');
    bk.controller('EditBrewCtrl', ['$scope', '$controller', '$filter', '$routeParams', 'Brew', 'BrewStatus', 'DatePicker', 'Identity', 'Notifier', 'Recipe',
        function ($scope, $controller, $filter, $routeParams, Brew, BrewStatus, DatePicker, Identity, Notifier, Recipe) {

            $controller('BaseAddEditBrewCtrl', { $scope: $scope });
        
            $scope.getBrew = function (brewId) {
                Brew.getByBrewId(brewId).then(function (response) {
                    $scope.setCurrentBrew(response.data);
                    $scope.getCurrentUserRecipes(response.data);
                });
            };
        
            $scope.getCurrentUserRecipes = function (currentBrew) {
                Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                    $scope.recipes = response.data;
                    $scope.hasRecipes = ($scope.recipes.length > 0);

                    $scope.brewRecipe = $scope.recipes.filter(function (recipe) {
                        return (currentBrew && recipe._id === currentBrew.recipeId);
                    })[0];
                });
            };
        
            $scope.setCurrentBrew = function (brew) {
                $scope.brewId = brew._id;
                $scope.brewName = brew.name;
                $scope.brewBatchSize = brew.batchSize;
                $scope.brewDescription = brew.description;
                $scope.brewRecipe = brew.recipeId;
                $scope.brewBrewDate = $filter('date')(brew.brewDate, 'M/d/yyyy');
                $scope.brewBottleDate = $filter('date')(brew.bottleDate, 'M/d/yyyy');
                $scope.brewChillDate = $filter('date')(brew.chillDate, 'M/d/yyyy');
                $scope.brewUrl = '/brew/view/' + $scope.brewId;
            
                $scope.brewStatusCde = $scope.statuses.filter(function (status) {
                    return (status.id === brew.statusCde);
                })[0];
            };

            $scope.submitBrew = function () {
                var updatedBrewData = $scope.getFormBrewData(),
                    redirectUrl = '/brew/view/' + $scope.brewId;
            
                Brew.update(updatedBrewData).then(function () {
                    $scope.successRedirect('Brew updated', redirectUrl);

                }, function (reason) {
                    Notifier.error(reason);
                });
            };
        
            // initialize
            $scope.statuses = BrewStatus.getStatuses();
            $scope.getBrew($routeParams.id);
            $scope.getCurrentUserRecipes();
        }
    ]);
})();

(function () {
    'use strict';

    angular.module('BrewKeeper').controller('EditBrewCtrl', function ($scope, $filter, $routeParams, $location, Brew, BrewStatus, DatePicker, Identity, Notifier, Recipe) {
        $scope.getBrew = function (brewId) {
            Brew.getByBrewId(brewId).then(function (response) {
                $scope.setCurrentBrew(response.data);
                $scope.getCurrentUserRecipes(response.data);
            });
        };
        
        $scope.getCurrentUserRecipes = function (currentBrew) {
            Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                $scope.recipes = response.data;
                
                // TODO: can this be somewhere else?
                for (var i = 0; i < $scope.recipes.length; i++) {
                    if (currentBrew && currentBrew.recipeId === $scope.recipes[i]._id) {
                        $scope.brewRecipe = $scope.recipes[i];
                    }
                }
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
            
            for (var i = 0; i < $scope.statuses.length; i++) {
                if ($scope.statuses[i].id === brew.statusCde) {
                    $scope.brewStatusCde = $scope.statuses[i];
                }
            }
        };
        
        $scope.checkRecipeCount = function () {
            Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                var recipeCount = 0;
                
                if (response && response.data) {
                    recipeCount = response.data.length;
                }
                
                $scope.hasRecipes = !!recipeCount;

            }, function (reason) {
                Notifier.error(reason);
            });
        };
        
        $scope.getFormBrewData = function () {
            return {
                id: $scope.brewId,
                name: $scope.brewName,
                batchSize: $scope.brewBatchSize,
                description: $scope.brewDescription,
                ownerId: Identity.getCurrentUserId(),
                recipeId: $scope.brewRecipe._id,
                statusCde: (!!$scope.brewStatusCde) ? $scope.brewStatusCde.id : -1,
                brewDate: $scope.brewBrewDate,
                bottleDate: $scope.brewBottleDate,
                chillDate: $scope.brewChillDate
            };
        };
        
        $scope.submitBrew = function () {
            var updatedBrewData = $scope.getFormBrewData(),
                url = '/brew/view/' + $scope.brewId;
            
            Brew.update(updatedBrewData).then(function () {
                Notifier.notify('Brew updated.');
                $location.path(url);
            }, function (reason) {
                Notifier.error(reason);
            });
        };
        
        // initialize
        $scope.statuses = BrewStatus.getStatuses();
        $scope.getBrew($routeParams.id);
        $scope.checkRecipeCount();
        $scope.getCurrentUserRecipes();
    });
})();

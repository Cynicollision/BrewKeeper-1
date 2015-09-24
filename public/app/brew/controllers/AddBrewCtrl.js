(function () {
    'use strict';

    angular.module('BrewKeeper').controller('AddBrewCtrl', function ($scope, $location, Brew, BrewStatus, DatePicker, Identity, Notifier, Recipe) {
        $scope.getCurrentUserRecipes = function () {
            Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                $scope.recipes = response.data;
                if (!!$scope.recipes && $scope.recipes.length) {
                    $scope.brewRecipe = $scope.recipes[0];
                    $scope.updateName();
                }
            });
        };
        
        $scope.getFormBrewData = function () {
            return {
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
            var newBrewData = $scope.getFormBrewData();
            Brew.save(newBrewData).then(function (response) {
                $scope.successRedirect();
            }, function (reason) {
                Notifier.error(reason);
            });
        };
        
        $scope.setDefaultControlValues = function () {
            if (!!$scope.statuses) {
                $scope.brewStatusCde = $scope.statuses[0];
            }

            $scope.brewBatchSize = 1;
        };
        
        $scope.successRedirect = function () {
            Notifier.notify('Brew added!');
            $location.path('/brew');
        };
        
        $scope.updateName = function () {
            var recipeId = $scope.brewRecipe._id,
                recipeName = $scope.brewRecipe.name;
            
            Recipe.getCount(recipeId).then(function (response) {
                $scope.brewName = recipeName + ' #' + (response.data.count + 1);
                
            }, function (reason) {
                Notifier.error(reason);
            });
        };
        
        // initialze
        $scope.statuses = BrewStatus.getStatuses();
        $scope.getCurrentUserRecipes();
        $scope.setDefaultControlValues();
    });
})();

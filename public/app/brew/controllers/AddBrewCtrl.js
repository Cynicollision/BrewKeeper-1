(function () {
    'use strict';

    angular.module('BrewKeeper').controller('AddBrewCtrl', function ($scope, $controller, Brew, BrewStatus, DatePicker, Identity, Notifier, Recipe) {
        $controller('BaseAddEditBrewCtrl', { $scope: $scope });
        
        $scope.getCurrentUserRecipes = function () {
            Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                $scope.recipes = response.data;

                if (!!$scope.recipes && $scope.recipes.length) {
                    $scope.brewRecipe = $scope.recipes[0];
                    $scope.updateName();
                }
            });
        };
        
        $scope.submitBrew = function () {
            var newBrewData = $scope.getFormBrewData();
            Brew.save(newBrewData).then(function (response) {
                $scope.successRedirect('Brew added', '/brew/');
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
        
        // updates the name to "<recipe> #<timesBrewed>"
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
        $scope.brewUrl = '/brew/';
        $scope.statuses = BrewStatus.getStatuses();
        $scope.setDefaultControlValues();
        $scope.getRecipeCount();
        $scope.getCurrentUserRecipes();
    });
})();

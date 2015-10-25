(function () {
    'use strict';

    angular.module('BrewKeeper').controller('ViewRecipeCtrl', function ($scope, $routeParams, $location, Identity, Recipe, Notifier) {

        $scope.getRecipe = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                var recipe = response.data;
                $scope.recipe = recipe;
                $scope.recipe.sourceUrl = $scope.getRecipeUrl(recipe);
            }, function (reason) {
                Notifier.error(reason);
                $location.path('/recipe');
            });
        };
        
        $scope.isRecipeOwnedByCurrentUser = function () {
            if ($scope.recipe) {
                return Recipe.isRecipeOwnedByUser($scope.recipe, Identity.getCurrentUserId());
            }
        };

        $scope.getRecipeBrewCount = function (recipeId) {
            Recipe.getCount(recipeId).then(function (response) {
                var timesBrewed = response.data.count;
                $scope.recipe.timesBrewed = timesBrewed;
            });
        };
        
        $scope.getRecipeUrl = function (recipe) {
            if (recipe.sourceUrl && recipe.sourceUrl.indexOf('http://') !== 0) {
                recipe.sourceUrl = 'http://' + recipe.sourceUrl;
            }

            return recipe.sourceUrl;
        };
        
        $scope.doEdit = function () {
            $location.path('/recipe/edit/' + $scope.recipe._id);
        };
        
        $scope.doDelete = function () {
            $location.path('/recipe/delete/' + $scope.recipe._id);
        };
        
        // initialize
        $scope.getRecipe($routeParams.id);
        $scope.getRecipeBrewCount($routeParams.id);
    });
})();

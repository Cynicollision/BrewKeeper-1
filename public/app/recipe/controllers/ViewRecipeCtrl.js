(function () {
    'use strict';

    angular.module('BrewKeeper').controller('ViewRecipeCtrl', function ($scope, $routeParams, $location, Recipe, Notifier) {
        $scope.recipeSvc = Recipe;
        
        $scope.getRecipe = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                $scope.setCurrentRecipe(response.data);
            }, function (reason) {
                Notifier.error(reason);
                $location.path('/recipe');
            });
        };
        
        $scope.setCurrentRecipe = function (recipe) {
            $scope.recipe = recipe;
            $scope.recipe.sourceUrl = $scope.getRecipeUrl(recipe);
            Recipe.getCount(recipe._id).then(function (response) {
                $scope.setRecipeTimesBrewed(response.data.count);
            });
        };
        
        $scope.setRecipeTimesBrewed = function (times) {
            $scope.recipe.timesBrewed = times;
        };
        
        $scope.getRecipeUrl = function (recipe) {
            var wut = recipe.sourceUrl.indexOf('http://');
            if (recipe.sourceUrl.indexOf('http://') !== 0) {
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
    });
})();

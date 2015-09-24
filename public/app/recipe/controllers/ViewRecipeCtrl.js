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
            Recipe.getCount(recipe._id).then(function (response) {
                $scope.recipe.timesBrewed = response.data.count;
            });
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

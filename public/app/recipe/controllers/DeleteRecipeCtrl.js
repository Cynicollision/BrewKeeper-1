(function () {
    'use strict';

    angular.module('BrewKeeper').controller('DeleteRecipeCtrl', function ($scope, $routeParams, $location, Identity, Recipe, Notifier) {
        $scope.getRecipe = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                if (Recipe.isRecipeOwnedByUser(response.data), Identity.getCurrentUserId()) {
                    $scope.recipe = response.data;
                } else {
                    $location.path('/');
                }
            });
        };
        
        $scope.onConfirmDelete = function () {
            Recipe.remove($routeParams.id).then(function (response) {
                Notifier.notify('Recipe deleted');
                $location.path('/recipe');
            });
        };
        
        $scope.onCancelDelete = function () {
            $location.path('/recipe/view/' + $routeParams.id);
        };

        // initialize
        $scope.recipe = null;
        $scope.getRecipe($routeParams.id);
    });
})();

(function () {
    'use strict';

    angular.module('BrewKeeper').controller('DeleteRecipeCtrl', function ($scope, $routeParams, $location, Recipe, Notifier) {
        $scope.getRecipe = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                if (Recipe.isRecipeOwnedByCurrentUser(response.data)) {
                    $scope.recipe = response.data;
                } else {
                    $location.path('/');
                }
            });
        };
        
        $scope.onConfirmDelete = function () {
            Recipe.remove($routeParams.id).then(function (response) {
                $scope.successRedirect();
            });
        };
        
        $scope.onCancelDelete = function () {
            $location.path('/recipe/view/' + $routeParams.id);
        };
        
        $scope.successRedirect = function () {
            Notifier.notify('Recipe delete');
            $location.path('/recipe');
        };

        // initialize
        $scope.recipe = null;
        $scope.getRecipe($routeParams.id);
    });
})();

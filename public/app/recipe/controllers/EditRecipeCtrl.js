(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('EditRecipeCtrl', function ($scope, $routeParams, $location, Recipe, Identity, Notifier) {
        $scope.getRecipe = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                $scope.setCurrentRecipe(response.data);
            });
        };

        $scope.setCurrentRecipe = function (recipe) {
            $scope.recipeId = recipe._id;
            $scope.recipeName = recipe.name;
            $scope.recipeDescription = recipe.description;
            $scope.recipeSourceName = recipe.sourceName;
            $scope.recipeSourceUrl = recipe.sourceUrl;
        };

        $scope.getFormRecipeData = function () {
            return {
                id: $scope.recipeId,
                ownerId: Identity.getCurrentUserId(),
                name: $scope.recipeName,
                description: $scope.recipeDescription,
                sourceName: $scope.recipeSourceName,
                sourceUrl: $scope.recipeSourceUrl
            };
        };

        $scope.submitRecipe = function () {
            var updatedRecipeData = $scope.getFormRecipeData(),
                url = '/recipe/view/' + $scope.recipeId;

            Recipe.update(updatedRecipeData).then(function () {
                Notifier.notify('Recipe updated.');
                $location.path(url);
            }, function (reason) {
                Notifier.error(reason);
            });
        };

        // initialize
        $scope.getRecipe($routeParams.id);
    });
})();

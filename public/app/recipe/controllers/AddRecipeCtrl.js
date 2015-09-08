(function () {
    'use strict';

    angular.module('BrewKeeper').controller('AddRecipeCtrl', function ($scope, $location, Recipe, Identity, Notifier) {
        $scope.getFormRecipeData = function () {
            return {
                ownerId: Identity.getCurrentUserId(),
                name: $scope.recipeName,
                description: $scope.recipeDescription,
                sourceName: $scope.recipeSourceName,
                sourceUrl: $scope.recipeSourceUrl
            };
        };

        $scope.submitRecipe = function () {
            var newRecipeData = $scope.getFormRecipeData();
            Recipe.save(newRecipeData).then(function (response) {
                $scope.successRedirect();
            }, function (reason) {
                Notifier.error(reason);
            });
        };

        $scope.successRedirect = function () {
            Notifier.notify('Recipe added!');
            $location.path('/recipe');
        };
    });
})();

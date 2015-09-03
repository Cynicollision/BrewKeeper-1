(function () {
    'use strict';

    angular.module('BrewKeeper').controller('AddRecipeCtrl', function ($scope, $location, Recipe, Identity, Notifier) {
        $scope.getFormRecipeData = function () {
            return {
                ownerId: Identity.getCurrentUserId(),
                name: $scope.recipeName,
                description: $scope.recipeDescription,
                sourceName: $scope.recipeSource,
                sourceUrl: $scope.recipeSourceUrl
            };
        };

        $scope.submitRecipe = function () {
            var newRecipeData = $scope.getFormRecipeData();
            Recipe.save(newRecipeData).then(function (response) {
                if (response.data.success) {
                    Notifier.notify('Recipe added!');
                    $location.path('/recipe');
                } else {
                    Notifier.error(response.data.reason);
                }
            }, function (reason) {
                Notifier.error(reason);
            });
        };
    });
})();

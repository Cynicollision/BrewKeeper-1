(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper');
    bk.controller('AddRecipeCtrl', ['$scope', '$location', 'Recipe', 'Identity', 'Notifier',
        function ($scope, $location, Recipe, Identity, Notifier) {
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
                    Notifier.notify('Recipe added!');
                    $location.path('/recipe');
                }, function (reason) {
                    Notifier.error(reason);
                });
            };
        }
    ]);
})();

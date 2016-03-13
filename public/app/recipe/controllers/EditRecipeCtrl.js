(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper');
    bk.controller('EditRecipeCtrl', ['$scope', '$routeParams', '$location', 'Identity', 'Recipe', 'Notifier',
        function ($scope, $routeParams, $location, Identity, Recipe, Notifier) {
            $scope.getRecipe = function (recipeId) {
                Recipe.getByRecipeId(recipeId).then(function (response) {
                    var recipe = response.data;

                    $scope.recipeId = recipe._id;
                    $scope.recipeName = recipe.name;
                    $scope.recipeDescription = recipe.description;
                    $scope.recipeSourceName = recipe.sourceName;
                    $scope.recipeSourceUrl = recipe.sourceUrl;

                    $scope.recipeUrl = '/recipe/view/' + recipe._id;
                });
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
        }
     ]);
})();

(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('EditRecipeCtrl', 
        
        ['$scope', '$routeParams', '$location', 'BaseCtrl', 'Identity', 'Recipe', 'Notifier',
        function ($scope, $routeParams, $location, BaseCtrl, Identity, Recipe, Notifier) {
            

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

            BaseCtrl.init(function () {

                Recipe.getByRecipeId($routeParams.id).then(function (response) {
                    var recipe = response.data;
                    
                    $scope.recipeId = recipe._id;
                    $scope.recipeName = recipe.name;
                    $scope.recipeDescription = recipe.description;
                    $scope.recipeSourceName = recipe.sourceName;
                    $scope.recipeSourceUrl = recipe.sourceUrl;
                    
                    $scope.recipeUrl = '/recipe/view/' + recipe._id;
                });
            });
        }
     ]);
})();

(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('AddRecipeCtrl', 
        
        ['$scope', '$location', 'Recipe', 'Identity', 'Notifier',
        function ($scope, $location, Recipe, Identity, Notifier) {

            function getFormRecipeData() {

                return {
                    ownerId: Identity.getCurrentUserId(),
                    name: $scope.recipeName,
                    description: $scope.recipeDescription,
                    sourceName: $scope.recipeSourceName,
                    sourceUrl: $scope.recipeSourceUrl,
                };
            }

            $scope.submitRecipe = function () {

                var newRecipeData = getFormRecipeData();
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

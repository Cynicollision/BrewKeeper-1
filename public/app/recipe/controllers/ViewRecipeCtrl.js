(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('ViewRecipeCtrl', 
        
        ['$scope', '$q', '$routeParams', '$location', 'BaseCtrl', 'Identity', 'Recipe', 'Notifier',
        function ($scope, $q, $routeParams, $location, BaseCtrl, Identity, Recipe, Notifier) {
            
            function getRecipeUrl(recipe) {
                if (recipe.sourceUrl && recipe.sourceUrl.indexOf('http://') !== 0) {
                    recipe.sourceUrl = 'http://' + recipe.sourceUrl;
                }
                
                return recipe.sourceUrl;
            }

            $scope.isRecipeOwnedByCurrentUser = function () {
                if ($scope.recipe) {
                    return Recipe.isRecipeOwnedByUser($scope.recipe, Identity.getCurrentUserId());
                }
            };

            $scope.doEdit = function () {
                $location.path('/recipe/edit/' + $scope.recipe._id);
            };
        
            $scope.doDelete = function () {
                $location.path('/recipe/delete/' + $scope.recipe._id);
            };
        
            BaseCtrl.init(function () {
                
                $q.all([
                    Recipe.getByRecipeId($routeParams.id).then(function (response) {
                        var recipe = response.data;
                        $scope.recipe = recipe;
                        $scope.recipe.sourceUrl = getRecipeUrl(recipe);
                    }, function (reason) {
                        Notifier.error(reason);
                        $location.path('/recipe');
                    }),

                    Recipe.getBrewCount($routeParams.id).then(function (response) {
                        var timesBrewed = response.data.count;
                        $scope.recipe.timesBrewed = timesBrewed;
                    }),
                ]);
            });
        }
    ]);
})();

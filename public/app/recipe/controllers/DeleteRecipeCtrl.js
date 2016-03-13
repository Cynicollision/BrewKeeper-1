(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('DeleteRecipeCtrl', 
        
        ['$scope', '$routeParams', '$location', 'BaseCtrl', 'Identity', 'Recipe', 'Notifier',
        function ($scope, $routeParams, $location, BaseCtrl, Identity, Recipe, Notifier) {
            
            $scope.onConfirmDelete = function () {
                Recipe.remove($routeParams.id).then(function (response) {
                    Notifier.notify('Recipe "' + $scope.recipe.name +'" deleted');
                    $location.path('/recipe');
                });
            };
        
            $scope.onCancelDelete = function () {
                $location.path('/recipe/view/' + $routeParams.id);
            };

            BaseCtrl.init(function () {
                $scope.recipe = null;

                Recipe.getByRecipeId($routeParams.id).then(function (response) {
                    if (Recipe.isRecipeOwnedByUser(response.data), Identity.getCurrentUserId()) {
                        $scope.recipe = response.data;
                    } 
                    else {
                        $location.path('/');
                    }
                });
            });
        }
    ]);
})();

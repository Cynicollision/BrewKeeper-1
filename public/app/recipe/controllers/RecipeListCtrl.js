(function () {
    'use strict';

    angular.module('BrewKeeper').controller('RecipeListCtrl', 
        
        ['$scope', '$location', 'BaseCtrl', 'Identity', 'Recipe',
        function ($scope, $location, BaseCtrl, Identity, Recipe) {
            
            var userId = Identity.getCurrentUserId();
            
            $scope.recipes = [];
            $scope.listLimit = 10;
            $scope.limitResults = false;
            $scope.hasRecipes = false;
            
            $scope.predicate = 'name';
            $scope.reverse = false;

            function getTopCurrentUserRecipes() {

                Recipe.getCountByUserId(userId).then(function (response) {
                    
                    var recipeCount = response.data.count;
                    $scope.hasRecipes = !!recipeCount;

                    if (recipeCount > $scope.listLimit) {
                        $scope.limitResults = true;
                        Recipe.getByUserId(userId, $scope.listLimit).then(function (response) {
                            $scope.recipes = response.data;
                        });
                    }
                    else {
                        $scope.getAllCurrentUserRecipes();
                    }
                });
            }

            $scope.getAllCurrentUserRecipes = function () {
                $scope.limitResults = false;
                Recipe.getByUserId(userId).then(function (response) {
                    $scope.recipes = response.data;
                });
            };

            $scope.doAddRecipe = function () {
                $location.path('/recipe/add');
            };
        
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
        
            BaseCtrl.init(function () {
                getTopCurrentUserRecipes();
            });
        }
    ]);
})();

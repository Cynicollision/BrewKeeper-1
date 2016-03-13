(function () {
    'use strict';

    angular.module('BrewKeeper').controller('RecipeListCtrl', 
        
        ['$scope', '$location', 'BaseCtrl', 'Identity', 'Recipe',
        function ($scope, $location, BaseCtrl, Identity, Recipe) {
        
            $scope.doAddRecipe = function () {
                $location.path('/recipe/add');
            };
        
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
        
            BaseCtrl.init(function () {
                $scope.recipes = [];
                $scope.predicate = 'name';
                $scope.showNoRecipes = false;
                
                Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                    $scope.recipes = response.data;
                    $scope.showNoRecipes = ($scope.recipes.length === 0);
                });
            });
        }
    ]);
})();

(function () {
    'use strict';

    var bk = angular.module('BrewKeeper');
    bk.controller('RecipeListCtrl', ['$scope', '$location', 'Identity', 'Recipe',
        function ($scope, $location, Identity, Recipe) {
        
            $scope.getCurrentUserRecipes = function () {
                Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                    $scope.recipes = response.data;
                    $scope.showNoRecipes = ($scope.recipes.length === 0);
                });
            };
        
            $scope.doAdd = function () {
                $location.path('/recipe/add');
            };
        
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
        
            // initialize
            $scope.predicate = 'name';
            $scope.showNoRecipes = false;
            $scope.getCurrentUserRecipes();
        }
    ]);
})();

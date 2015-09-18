(function () {
    'use strict';

    angular.module('BrewKeeper').controller('BrewListCtrl', function ($scope, Brew, Recipe, Identity) {
        var recipeId;
        $scope.getCurrentUserBrews = function () {
            var userID = Identity.getCurrentUserId();
            Brew.getByUserId(userID).then(function (response) {
                $scope.brews = response.data;
                for (var i = 0; i < $scope.brews.length; i++) {
                    recipeId = $scope.brews[i].recipeId;
                    if (!$scope.hasRecipe(recipeId)) {
                        $scope.getRecipeName($scope.brews[i].recipeId);
                    } 
                }
            });
        };
        
        $scope.sortOptions = [
            { value: 'status', text: 'Sort by Status' },
            { value: 'createdDate', text: 'Sort by Created Date' }
        ];

        $scope.getRecipeName = function (recipeId) {
            Recipe.getByRecipeId(recipeId).then(function (response) {
                $scope.setRecipeName(response.data._id, response.data.name);
            });
        };
        
        $scope.setRecipeName = function (recipeId, recipeName) {
            if (!$scope.recipeNames) {
                $scope.recipeNames = {};
            }
            $scope.recipeNames[recipeId] = recipeName;
        };
        
        $scope.hasRecipe = function (recipeId) {
            if ($scope.recipeNames) {
                return (!!$scope.recipeNames[recipeId]);
            }
            return false;
        };
        
        $scope.brews = null;
        $scope.sortOrder = $scope.sortOptions[0].value;
        $scope.getCurrentUserBrews();
    });
})();

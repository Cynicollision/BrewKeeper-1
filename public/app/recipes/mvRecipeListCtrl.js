angular.module('app').controller('mvRecipeListCtrl', function ($scope, mvCachedRecipes) {
    $scope.recipes = mvCachedRecipes.query();
    $scope.sortOptions = [
        { value: 'name', text: 'Sort by Name' },
        { value: 'type', text: 'Sort by Type' }
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;
});

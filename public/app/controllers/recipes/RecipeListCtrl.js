angular.module('app').controller('RecipeListCtrl', function ($scope, CachedRecipes) {
    $scope.recipes = CachedRecipes.query();
    $scope.sortOptions = [
        { value: 'name', text: 'Sort by Name' },
        { value: 'type', text: 'Sort by Type' }
    ];
    $scope.sortOrder = $scope.sortOptions[0].value;
});

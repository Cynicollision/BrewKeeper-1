angular.module('BrewKeeper').controller('RecipeListCtrl', function ($scope, Recipe) {
    $scope.getCurrentUserRecipes = function () {
        Recipe.getAll().then(function (response) {
            $scope.recipes = response.data;
        });
    };
    
    $scope.sortOptions = [
        { value: 'name', text: 'Sort by Name' },
        { value: 'type', text: 'Sort by Type' }
    ];
    
    // initialize
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getCurrentUserRecipes();
});

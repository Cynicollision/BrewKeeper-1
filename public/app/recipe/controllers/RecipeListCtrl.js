angular.module('BrewKeeper').controller('RecipeListCtrl', function ($scope, $location, Identity, Recipe) {
    $scope.getCurrentUserRecipes = function () {
        Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
            $scope.recipes = response.data;
        });
    };
    
    $scope.sortOptions = [
        { value: 'name', text: 'Sort by Name' },
        { value: 'type', text: 'Sort by Type' }
    ];
    
    $scope.doAdd = function () {
        $location.path('/recipe/add');
    };
    
    // initialize
    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getCurrentUserRecipes();
});

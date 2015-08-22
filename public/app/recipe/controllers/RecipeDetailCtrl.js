angular.module('BrewKeeper').controller('RecipeDetailCtrl', function ($scope, $routeParams, Recipe) {
    $scope.getRecipe = function (recipeId) {
        Recipe.getByRecipeId(recipeId).then(function (response) {
            $scope.setCurrentRecipe(response.data);
        });
    };
    
    $scope.setCurrentRecipe = function (recipe) {
        $scope.recipe = recipe;
    };

    $scope.isRecipeOwner = function () {
        return (!!$scope.recipe && Identity.getCurrentUserId() === $scope.recipe.ownerId);
    };

    // initialize
    $scope.getRecipe($routeParams.id);
});

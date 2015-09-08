angular.module('BrewKeeper').controller('ViewRecipeCtrl', function ($scope, $routeParams, $location, $window, Recipe, Notifier) {
    $scope.recipeSvc = Recipe;

    $scope.getRecipe = function (recipeId) {
        Recipe.getByRecipeId(recipeId).then(function (response) {
            $scope.setCurrentRecipe(response.data);
        }, function (reason) {
            Notifier.error(reason);
            $location.path('/recipe');
        });
    };
    
    $scope.setCurrentRecipe = function (recipe) {
        $scope.recipe = recipe;
    };

    $scope.doEdit = function () {
        $window.location = '/recipe/edit/' + $scope.recipe._id;
    };
    
    $scope.doDelete = function () {
        $window.location = '/recipe/delete/' + $scope.recipe._id;
    };

    // initialize
    $scope.getRecipe($routeParams.id);
});

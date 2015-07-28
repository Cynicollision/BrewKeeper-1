angular.module('BrewKeeper').controller('RecipeDetailCtrl', function ($scope, $routeParams, Recipe) {
    Recipe.getAll().then(function (collection) {
        collection.forEach(function (recipe) {
            if (recipe._id === $routeParams.id) {
                $scope.recipe = recipe;
            }
        });
    });
});

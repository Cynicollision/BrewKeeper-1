angular.module('BrewKeeper').controller('RecipeDetailCtrl', function ($scope, CachedRecipes, $routeParams) {
    CachedRecipes.query().$promise.then(function (collection) {
        collection.forEach(function (recipe) {
            if (recipe._id === $routeParams.id) {
                $scope.recipe = recipe;
            }
        });
    });
});

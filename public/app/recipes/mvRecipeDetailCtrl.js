angular.module('app').controller('mvRecipeDetailCtrl', function ($scope, mvCachedRecipes, $routeParams) {
    mvCachedRecipes.query().$promise.then(function (collection) {
        collection.forEach(function (recipe) {
            if (recipe._id === $routeParams.id) {
                $scope.recipe = recipe;
            }
        });
    });
});

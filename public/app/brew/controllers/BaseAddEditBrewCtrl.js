(function () {
    'use strict';

    angular.module('BrewKeeper').controller('BaseAddEditBrewCtrl', function ($scope, $location, BrewStatus, Identity, Recipe, Notifier) {
        $scope.getRecipeCount = function () {
            Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                var recipeCount = 0;
                
                if (response && response.data) {
                    recipeCount = response.data.length;
                }
                
                $scope.recipeCount = recipeCount;
                $scope.hasRecipes = !!$scope.recipeCount;
            }, function (reason) {
                Notifier.error(reason);
            });
        };

        $scope.getFormBrewData = function () {
            return {
                id: $scope.brewId,
                name: $scope.brewName,
                batchSize: $scope.brewBatchSize,
                description: $scope.brewDescription,
                ownerId: Identity.getCurrentUserId(),
                recipeId: $scope.brewRecipe._id,
                statusCde: (!!$scope.brewStatusCde) ? $scope.brewStatusCde.id : -1,
                brewDate: $scope.brewBrewDate,
                bottleDate: $scope.brewBottleDate,
                chillDate: $scope.brewChillDate
            };
        };

        $scope.successRedirect = function (msg, path) {
            Notifier.notify(msg);
            $location.path(path);
        };
    });
})();

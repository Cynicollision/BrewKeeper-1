﻿(function () {
    'use strict';

    angular.module('BrewKeeper').controller('BaseAddEditBrewCtrl', function ($scope, $location, BrewStatus, Identity, Recipe, Notifier) {
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

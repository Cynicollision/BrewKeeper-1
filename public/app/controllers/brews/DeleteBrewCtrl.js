﻿angular.module('BrewKeeper').controller('DeleteBrewCtrl', function ($scope, $routeParams, $location, Brew, Identity, Notifier) {
    $scope.brew = null;

    $scope.getBrew = function (brewId) {
        Brew.getByBrewId(brewId).then(function (response) {
            if (Brew.isBrewOwnedByCurrentUser(response.data)) {
                $scope.brew = response.data;
            } else {
                $location.path('/');
            }
        });
    };

    $scope.onConfirmDelete = function () {
        Brew.delete($routeParams.id).then(function (response) {
            Notifier.notify('Brew deleted');
            $location.path('/brews');
        });
    };

    $scope.getBrew($routeParams.id);
});

(function () {
    'use strict';

    var bk = angular.module('BrewKeeper');
    bk.controller('DeleteBrewCtrl', ['$scope', '$routeParams', '$location', 'Brew', 'Identity', 'Notifier', 
        function ($scope, $routeParams, $location, Brew, Identity, Notifier) {
            $scope.getBrew = function (brewId) {
                Brew.getByBrewId(brewId).then(function (response) {
                    if (Brew.isBrewOwnedByUser(response.data, Identity.getCurrentUserId())) {
                        $scope.brew = response.data;
                    } else {
                        $location.path('/');
                    }
                });
            };
        
            $scope.onConfirmDelete = function () {
                Brew.remove($routeParams.id).then(function (response) {
                    Notifier.notify('Brew deleted');
                    $location.path('/brew');
                });
            };
        
            $scope.onCancelDelete = function () {
                $location.path('/brew/view/' + $routeParams.id);
            };
        
            // initialize
            $scope.brew = null;
            $scope.getBrew($routeParams.id);
        }
    ]);
})();

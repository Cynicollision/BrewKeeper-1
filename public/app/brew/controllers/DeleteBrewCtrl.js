(function () {
    'use strict';

    angular.module('BrewKeeper').controller('DeleteBrewCtrl', 
        
        ['$scope', '$routeParams', '$location', 'BaseCtrl', 'Brew', 'Identity', 'Notifier', 
        function ($scope, $routeParams, $location, BaseCtrl, Brew, Identity, Notifier) {

            $scope.onConfirmDelete = function () {
                Brew.remove($routeParams.id).then(function (response) {
                    Notifier.notify('Brew deleted');
                    $location.path('/brew');
                });
            };
        
            $scope.onCancelDelete = function () {
                $location.path('/brew/view/' + $routeParams.id);
            };
        
            BaseCtrl.init(function () {
                $scope.brew = null;
               
                Brew.getByBrewId($routeParams.id).then(function (response) {

                    if (Brew.isBrewOwnedByUser(response.data, Identity.getCurrentUserId())) {
                        $scope.brew = response.data;
                    } else {
                        $location.path('/');
                    }
                });
            });
        }
    ]);
})();

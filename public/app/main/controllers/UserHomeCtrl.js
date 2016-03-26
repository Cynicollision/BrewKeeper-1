(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('UserHomeCtrl', 

        ['$scope', '$location', 'BaseCtrl', 'Brew', 'BrewStatus', 'Identity',
        function ($scope, $location, BaseCtrl, Brew, BrewStatus, Identity) {
            
            $scope.hasActivity = true;
            $scope.fermentingBrews = [];
            $scope.bottledBrews = [];
            $scope.chillingBrews = [];

            BaseCtrl.init(function () {

                Brew.getActiveByUserId(Identity.getCurrentUserId()).then(function (response) {
                    
                    // exclude "not yet started" brews
                    var brews = response.data;

                    $scope.hasActivity = !!brews.length;

                    $scope.fermentingBrews = brews.filter(function (brew) {
                        return (brew.statusCde === BrewStatus.Fermenting);
                    });
                    
                    $scope.bottledBrews = brews.filter(function (brew) {
                        return (brew.statusCde === BrewStatus.Bottled);
                    });
                });
            });
        }
    ]);
})();

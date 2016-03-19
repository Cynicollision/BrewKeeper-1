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

                    var brews = response.data;

                    $scope.fermentingBrews = brews.filter(function (brew) {
                        return (brew.statusCde === BrewStatus.Fermenting);
                    });
                    
                    $scope.bottledBrews = brews.filter(function (brew) {
                        return (brew.statusCde === BrewStatus.Bottled);
                    });

                    $scope.chillingBrews = brews.filter(function (brew) {
                        return (brew.statusCde === BrewStatus.Chilling);
                    });

                    var notYetStartedCount = brews.filter(function (brew) {
                        return (brew.statusCde == BrewStatus.NotStartedYet);
                    }).length;

                    $scope.hasActivity = !!brews.length || !notYetStartedCount;
                });
            });
        }
    ]);
})();

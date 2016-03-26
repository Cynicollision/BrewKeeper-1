(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('BrewListCtrl', 

        ['$scope', '$location', 'BaseCtrl', 'Brew', 'BrewStatus', 'Identity',
        function ($scope, $location, BaseCtrl, Brew, BrewStatus, Identity) {
            
            var userId = Identity.getCurrentUserId();
            
            $scope.brews = [];
            $scope.listLimit = 10;
            $scope.limitResults = false;
            $scope.hasBrews = false;
            $scope.getStatusDisplay = BrewStatus.getDisplay;

            $scope.predicate = 'brewDate';
            $scope.reverse = true;

            function getTopCurrentUserBrews() {

                Brew.getCountByUserId(userId).then(function (response) {

                    var brewCount = response.data.count;
                    $scope.hasBrews = !!brewCount;

                    if (brewCount > $scope.listLimit) {
                        $scope.limitResults = true;
                        Brew.getByUserId(userId, $scope.listLimit).then(function (response) {
                            $scope.brews = response.data;
                        });
                    } 
                    else {
                        $scope.getAllCurrentUserBrews();
                    }
                });
            }
        
            $scope.getAllCurrentUserBrews = function () {
                $scope.limitResults = false;
                Brew.getByUserId(userId).then(function (response) {
                    $scope.brews = response.data;
                });
            };
        
            $scope.doAddBrew = function () {
                $location.path('/brew/add');
            };
        
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
        
            BaseCtrl.init(function () {
                getTopCurrentUserBrews();
            });
        }
    ]);
})();

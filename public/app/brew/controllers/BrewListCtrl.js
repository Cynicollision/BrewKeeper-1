(function () {
    'use strict';

    angular.module('BrewKeeper').controller('BrewListCtrl', function ($scope, $location, Brew, BrewStatus, Identity) {
        var recipeId, brewStatuses;
            

        $scope.getTopCurrentUserBrews = function () {
            var userId = Identity.getCurrentUserId();
            
            Brew.getCountByUserId(userId).then(function (response) {
                var brewCount = response.data.count;
                
                if (brewCount === 0) {
                    $scope.showNoBrews = true;
                }

                if (brewCount > $scope.listLimit) {
                    $scope.limitResults = true;
                    Brew.getByUserId(userId, $scope.listLimit).then(function (response) {
                        $scope.brews = response.data;
                    });

                } else {
                    $scope.getAllCurrentUserBrews();
                }
            });


        };
        
        $scope.getAllCurrentUserBrews = function () {
            $scope.limitResults = false;
            var userId = Identity.getCurrentUserId();
            Brew.getByUserId(userId).then(function (response) {
                $scope.brews = response.data;
            });
        };
        
        $scope.doAdd = function () {
            $location.path('/brew/add');
        };
        
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
        
        // initialize
        $scope.listLimit = 10;
        $scope.showNoBrews = false;
        $scope.limitResults = false;
        $scope.brews = null;
        $scope.predicate = 'brewDate';
        $scope.reverse = true;
        $scope.getStatusDisplay = BrewStatus.getDisplay;
        $scope.getTopCurrentUserBrews();
    });
})();

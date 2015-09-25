(function () {
    'use strict';

    angular.module('BrewKeeper').controller('BrewListCtrl', function ($scope, $location, Brew, BrewStatus, Identity) {
        var recipeId, brewStatuses;

        $scope.getCurrentUserBrews = function () {
            var userID = Identity.getCurrentUserId();
            Brew.getByUserId(userID).then(function (response) {
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
        $scope.brews = null;
        $scope.predicate = 'brewDate';
        $scope.reverse = true;
        $scope.getStatusDisplay = BrewStatus.getDisplay;
        $scope.getCurrentUserBrews();
    });
})();

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
        
        $scope.sortOptions = [
            { value: 'name', text: 'Sort by Name' },
            { value: 'brewDate', text: 'Sort by Created Date' }
        ];
        
        $scope.doAdd = function () {
            $location.path('/brew/add');
        };
        
        $scope.brews = null;
        $scope.sortOrder = $scope.sortOptions[0].value;
        $scope.getStatusDisplay = BrewStatus.getDisplay;
        $scope.getCurrentUserBrews();
    });
})();

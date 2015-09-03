(function () {
    'use strict';

    angular.module('BrewKeeper').controller('BrewListCtrl', function ($scope, Brew, Identity) {
        $scope.getCurrentUserBrews = function () {
            Brew.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                $scope.brews = response.data;
            });
        };
        
        $scope.sortOptions = [
            { value: 'status', text: 'Sort by Status' },
            { value: 'createdDate', text: 'Sort by Created Date' }
        ];
        
        $scope.sortOrder = $scope.sortOptions[0].value;
        $scope.getCurrentUserBrews();
    });
})();

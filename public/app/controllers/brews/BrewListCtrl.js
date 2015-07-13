angular.module('app').controller('BrewListCtrl', function ($scope, BrewService, IdentityService) {
    $scope.getCurrentUserBrews = function () {
        BrewService.queryForUser(IdentityService.getCurrentUserId()).then(function (response) {
            $scope.brews = response.data;
        });
    };

    $scope.sortOptions = [
        { value: 'name', text: 'Sort by Name' },
        { value: 'brewedOn', text: 'Sort by Brew Date' }
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.getCurrentUserBrews();
});

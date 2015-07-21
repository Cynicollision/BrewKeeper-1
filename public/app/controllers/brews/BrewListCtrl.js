angular.module('BrewKeeper').controller('BrewListCtrl', function ($scope, Brew, Identity) {
    $scope.getCurrentUserBrews = function () {
        Brew.getByUserId(Identity.getCurrentUserId()).then(function (response) {
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

angular.module('app').controller('mvBrewListCtrl', function ($scope, mvBrew) {
    mvBrew.query().then(function (response) {
        $scope.brews = response.data;
    });

    $scope.sortOptions = [
        { value: 'name', text: 'Sort by Name' },
        { value: 'brewedOn', text: 'Sort by Brew Date' }
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
});

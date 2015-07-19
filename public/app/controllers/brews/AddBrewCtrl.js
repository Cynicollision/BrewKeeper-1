angular.module('app').controller('AddBrewCtrl', function ($scope, $location, Brew, Identity, Notifier) {
    $scope.getNewBrewData = function () {
        return {
            name: $scope.name,
            brewedOn: $scope.brewedOn,
            brewedBy: Identity.getCurrentUserId()
        };
    };

    $scope.saveBrew = function () {
        var newBrewData = $scope.getNewBrewData();

        Brew.save(newBrewData).then(function (response) {
            if (!response.data.reason) {
                Notifier.notify('Brew added!');
                $location.path('/brews');
            } else {
                Notifier.error(response.data.reason);
            }
        }, function (reason) {
            Notifier.error(reason);
        });
    };
});

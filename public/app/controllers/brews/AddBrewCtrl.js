angular.module('BrewKeeper').controller('AddBrewCtrl', function ($scope, $location, Brew, Identity, Notifier, Recipe) {
    $scope.statuses = [
        { id: 1, name: "Not started yet" },
        { id: 2, name: "Fermenting" },
        { id: 3, name: "Bottled" },
        { id: 4, name: "Chilling" }
    ];

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
    
    $scope.setDefaultStatus = function () {
        if (!!$scope.statuses) {
            $scope.status = $scope.statuses[0];
        }
    };

    $scope.setDefaultStatus();
});

angular.module('app').controller('AddBrewCtrl', function ($scope, $location, Brew, Identity, Notifier) {
    $scope.saveBrew = function () {
        var newBrewData = {
            name: $scope.name,
            brewedOn: $scope.brewedOn,
            brewedBy: Identity.getCurrentUserId()
        };
        
        Brew.save(newBrewData).then(function (err) {
            if (!err) {
                Notifier.notify('Brew saved!');
                $location.path('/brews');
            } else {
                Notifier.error('ERROR: '+ err.reason);
            }
        }, function (reason) {
            Notifier.error(reason);
        });
    };
});

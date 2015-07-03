angular.module('app').controller('mvAddBrewCtrl', function ($scope, $location, BrewService, mvIdentity, mvNotifier) {
    $scope.saveBrew = function () {
        var newBrewData = {
            name: $scope.name,
            brewedOn: $scope.brewedOn,
            brewedBy: mvIdentity.getCurrentUserId()
        };
        
        BrewService.save(newBrewData).then(function (err) {
            if (!err) {
                mvNotifier.notify('Brew saved!');
                $location.path('/brews');
            } else {
                mvNotifier.error(err.reason);
            }
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});

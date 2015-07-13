angular.module('app').controller('AddBrewCtrl', function ($scope, $location, BrewService, Identity, mvNotifier) {
    $scope.saveBrew = function () {
        var newBrewData = {
            name: $scope.name,
            brewedOn: $scope.brewedOn,
            brewedBy: Identity.getCurrentUserId()
        };
        
        BrewService.save(newBrewData).then(function (err) {
            if (!err) {
                mvNotifier.notify('Brew saved!');
                $location.path('/brews');
            } else {
                mvNotifier.error('ERROR: '+ err.reason);
            }
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});

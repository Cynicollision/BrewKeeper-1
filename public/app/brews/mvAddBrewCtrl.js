angular.module('app').controller('mvAddBrewCtrl', function ($scope, $location, mvBrew, mvIdentity, mvNotifier, mvCachedBrews) {
    $scope.saveBrew = function () {
        var newBrewData = {
            name: $scope.name,
            brewedOn: $scope.brewedOn,
            brewedBy: mvIdentity.currentUser._id
        };

        mvBrew.save(newBrewData).then(function (err) {
            if (!err) {
                mvNotifier.notify('Brew saved!');
                $location.path('/brews').search({ refresh: 1 });
            } else {
                mvNotifier.error(err.reason);
            }
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});
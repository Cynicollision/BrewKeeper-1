angular.module('app').controller('mvBrewDetailCtrl', function ($scope, mvCachedBrews, $routeParams) {
    mvCachedBrews.query().$promise.then(function (collection) {
        collection.forEach(function (brew) {
            if (brew._id === $routeParams.id) {
                $scope.brew = brew;
            }
        });
    });
});

angular.module('app').controller('mvBrewDetailCtrl', function ($scope, mvCachedBrews, $routeParams) {
    mvCachedBrews.query().then(function (response) {
        response.data.forEach(function (brew) {
            if (brew._id === $routeParams.id) {
                $scope.brew = brew;
            }
        });
    });
});

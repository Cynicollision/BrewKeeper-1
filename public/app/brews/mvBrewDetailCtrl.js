angular.module('app').controller('mvBrewDetailCtrl', function ($scope, $routeParams, BrewService, mvIdentity) {
    $scope.getCurrentUserBrews = function () {
        BrewService.queryForUser(mvIdentity.getCurrentUserId()).then(function (response) {
            response.data.forEach(function (brew) {
                if (brew._id === $routeParams.id) {
                    $scope.brew = brew;
                }
            });
        });
    };
    
    $scope.getCurrentUserBrews();
});

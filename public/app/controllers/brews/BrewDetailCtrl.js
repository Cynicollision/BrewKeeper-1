angular.module('app').controller('BrewDetailCtrl', function ($scope, $routeParams, BrewService, mvIdentity) {
    $scope.getCurrentUserBrews = function () {
        BrewService.queryForUser(mvIdentity.getCurrentUserId()).then(function (response) {
            response.data.forEach(function (brew) {
                if (brew._id === $routeParams.id) {
                    $scope.setCurrentBrew(brew);
                }
            });
        });
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brew = brew;
    };
    
    $scope.getCurrentUserBrews();
});

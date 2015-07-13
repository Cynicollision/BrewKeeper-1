angular.module('app').controller('BrewDetailCtrl', function ($scope, $routeParams, BrewService, Identity) {
    var onGetCurrentUserBrews = function (response) {
        response.data.forEach(function (brew) {
            if (brew._id === $routeParams.id) {
                $scope.setCurrentBrew(brew);
            }
        });
    };
    
    // TODO: implement BrewService.queryById(brewId), don't retrieve all again
    $scope.getCurrentUserBrews = function () {
        BrewService.queryForUser(Identity.getCurrentUserId()).then(onGetCurrentUserBrews);
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brew = brew;
    };
    
    $scope.getCurrentUserBrews();
});

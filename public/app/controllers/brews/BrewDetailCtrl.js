angular.module('app').controller('BrewDetailCtrl', function ($scope, $routeParams, BrewService, mvIdentity) {
    var onGetCurrentUserBrews = function (response) {
        response.data.forEach(function (brew) {
            if (brew._id === $routeParams.id) {
                $scope.setCurrentBrew(brew);
            }
        });
    };
    
    // TODO: implement BrewService.queryById(brewId), don't retrieve all again
    $scope.getCurrentUserBrews = function () {
        BrewService.queryForUser(mvIdentity.getCurrentUserId()).then(onGetCurrentUserBrews);
    };
    
    $scope.setCurrentBrew = function (brew) {
        $scope.brew = brew;
    };
    
    $scope.getCurrentUserBrews();
});

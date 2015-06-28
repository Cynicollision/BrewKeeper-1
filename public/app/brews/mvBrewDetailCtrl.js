angular.module('app').controller('mvBrewDetailCtrl', function ($scope, $routeParams, mvBrew, mvIdentity) {
    mvBrew.queryForUser(mvIdentity.getCurrentUserId()).then(function (response) {
        response.data.forEach(function (brew) {
            if (brew._id === $routeParams.id) {
                $scope.brew = brew;
            }
        });
    });
});

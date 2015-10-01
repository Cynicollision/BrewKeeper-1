(function () {
    angular.module('BrewKeeper').controller('DeleteBrewCtrl', function ($scope, $routeParams, $location, Brew, Identity, Notifier) {
        $scope.getBrew = function (brewId) {
            Brew.getByBrewId(brewId).then(function (response) {
                if (Brew.isBrewOwnedByCurrentUser(response.data)) {
                    $scope.brew = response.data;
                } else {
                    $location.path('/');
                }
            });
        };
        
        $scope.onConfirmDelete = function () {
            Brew.remove($routeParams.id).then(function (response) {
                $scope.successRedirect();
            });
        };
        
        $scope.onCancelDelete = function () {
            $location.path('/brew/view/' + $routeParams.id);
        };
        
        // TODO: BaseCtrl.successRedirect(msg, path)
        $scope.successRedirect = function () {
            Notifier.notify('Brew deleted');
            $location.path('/brew');
        };
        
        // initialize
        $scope.brew = null;
        $scope.getBrew($routeParams.id);
    });
})();

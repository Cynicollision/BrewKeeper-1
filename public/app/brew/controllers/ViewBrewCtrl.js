(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper').controller('ViewBrewCtrl', 

        ['$scope', '$routeParams', '$location', '$window', 'BaseCtrl', 'Brew', 'BrewStatus', 'Identity', 'Notifier', 'Recipe', 
        function ($scope, $routeParams, $location, $window, BaseCtrl, Brew, BrewStatus, Identity, Notifier, Recipe) {

            $scope.statusLookup = BrewStatus;

            $scope.getBrew = function (brewId) {

                Brew.getByBrewId(brewId).then(function (response) {
                    $scope.brew = response.data;
                    $scope.getRecipeName($scope.brew.recipeId);
                }, function (response) {
                    Notifier.error(response);
                    $location.path('/brew');
                });
            };
        
            $scope.isBrewOwnedByCurrentUser = function () {
                if ($scope.brew) {
                    return Brew.isBrewOwnedByUser($scope.brew, Identity.getCurrentUserId());
                }
            };
        
            $scope.getRecipeName = function (recipeId) {
                Recipe.getByRecipeId(recipeId).then(function (response) {
                    $scope.recipeName = response.data.name;
                }, function (response) {
                    Notifier.error(response);
                });
            };
        
            $scope.doEdit = function () {
                $window.location = '/brew/edit/' + $scope.brew._id;
            };
        
            $scope.doDelete = function () {
                $window.location = '/brew/delete/' + $scope.brew._id;
            };
        
            BaseCtrl.init(function () {
                $scope.getBrew($routeParams.id);
                $scope.recipeName = '';
            });
        }
    ]);
})();

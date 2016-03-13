(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('ViewBrewCtrl', 

        ['$scope', '$routeParams', '$location', '$window', 'BaseCtrl', 'Brew', 'BrewStatus', 'Identity', 'Notifier', 'Recipe', 
        function ($scope, $routeParams, $location, $window, BaseCtrl, Brew, BrewStatus, Identity, Notifier, Recipe) {

            function getRecipeName(recipeId) {
                Recipe.getByRecipeId(recipeId).then(function (response) {
                    $scope.recipeName = response.data.name;
                }, function (response) {
                    Notifier.error(response);
                });
            }

            $scope.isBrewOwnedByCurrentUser = function () {
                if ($scope.brew) {
                    return Brew.isBrewOwnedByUser($scope.brew, Identity.getCurrentUserId());
                }
            };

            $scope.doEdit = function () {
                $window.location = '/brew/edit/' + $scope.brew._id;
            };
        
            $scope.doDelete = function () {
                $window.location = '/brew/delete/' + $scope.brew._id;
            };
        
            BaseCtrl.init(function () {
                
                $scope.statusLookup = BrewStatus;
                $scope.recipeName = '';
                $scope.brew = null;

                Brew.getByBrewId($routeParams.id).then(function (response) {
                    $scope.brew = response.data;
                    getRecipeName($scope.brew.recipeId);
                }, function (response) {
                    Notifier.error(response);
                    $location.path('/brew');
                });
            });
        }
    ]);
})();

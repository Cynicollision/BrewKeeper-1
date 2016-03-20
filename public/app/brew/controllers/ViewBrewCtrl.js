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
                $location.path('/brew/edit/' + $scope.brew._id);
            };
        
            $scope.doDelete = function () {
                $location.path('/brew/delete/' + $scope.brew._id);
            };
            
            $scope.doGoBack = function () {
                $location.path('/brew/');
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

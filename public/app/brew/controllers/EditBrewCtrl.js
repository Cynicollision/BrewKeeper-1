(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('EditBrewCtrl', 
        
        ['$scope', '$q', '$controller', '$filter', '$routeParams', 'BaseCtrl', 'Brew', 'BrewStatus', 'DatePicker', 'Identity', 'Notifier', 'Recipe',
        function ($scope, $q, $controller, $filter, $routeParams, BaseCtrl, Brew, BrewStatus, DatePicker, Identity, Notifier, Recipe) {

            $controller('BaseAddEditBrewCtrl', { $scope: $scope });
        
            function setCurrentBrew(brew) {
                $scope.brewId = brew._id;
                $scope.brewName = brew.name;
                $scope.brewBatchSize = brew.batchSize;
                $scope.brewDescription = brew.description;
                $scope.brewRecipe = brew.recipeId;
                $scope.brewBrewDate = $filter('date')(brew.brewDate, 'M/d/yyyy');
                $scope.brewBottleDate = $filter('date')(brew.bottleDate, 'M/d/yyyy');
                $scope.brewChillDate = $filter('date')(brew.chillDate, 'M/d/yyyy');
                $scope.brewUrl = '/brew/view/' + $scope.brewId;
            
                $scope.brewStatusCde = $scope.statuses.filter(function (status) {
                    return (status.id === brew.statusCde);
                })[0];
            }

            $scope.submitBrew = function () {
                var updatedBrewData = $scope.getFormBrewData(),
                    redirectUrl = '/brew/view/' + $scope.brewId;
            
                Brew.update(updatedBrewData).then(function () {
                    BaseCtrl.successRedirect('Brew updated.', redirectUrl);

                }, function (reason) {
                    Notifier.error(reason);
                });
            };
        
            BaseCtrl.init(function () {
                $scope.recipes = [];
                $scope.statuses = BrewStatus.getStatuses();
                
                $q.all([
                    Brew.getByBrewId($routeParams.id).then(function (response) {
                        $scope.brew = response.data;
                        setCurrentBrew(response.data);
                    }),

                    Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
                        $scope.recipes = response.data.sort(function (a, b) {
                            return a.name > b.name;
                        });
                        $scope.hasRecipes = !!$scope.recipes.length;
                    }),
                ])
                .then(function () {

                    $scope.brewRecipe = $scope.recipes.filter(function (recipe) {
                        return ($scope.brew && recipe._id === $scope.brew.recipeId);
                    })[0];
                });
            });
        }
    ]);
})();

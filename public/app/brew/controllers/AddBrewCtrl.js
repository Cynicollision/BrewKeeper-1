(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('AddBrewCtrl', 

        ['$scope', '$controller', 'BaseCtrl', 'Brew', 'BrewStatus', 'DatePicker', 'Identity', 'Notifier', 'Recipe', 
        function ($scope, $controller, BaseCtrl, Brew, BrewStatus, DatePicker, Identity, Notifier, Recipe) {

            $controller('BaseAddEditBrewCtrl', { $scope: $scope });
        
            function getCurrentUserRecipes() {

                Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {

                    $scope.recipes = response.data;
                    $scope.hasRecipes = !!$scope.recipes.length;

                    if (!!$scope.recipes && $scope.recipes.length) {
                        $scope.brewRecipe = $scope.recipes[0];
                        updateBrewName();
                    }
                });
            }
            
            function setDefaultControlValues() {
                if (!!$scope.statuses) {
                    $scope.brewStatusCde = $scope.statuses[0];
                }
                
                $scope.brewBatchSize = 1;
            }

            // updates the name to "<recipe> #<timesBrewed>"
            function updateBrewName() {
                var recipeId = $scope.brewRecipe._id,
                    recipeName = $scope.brewRecipe.name;
            
                Recipe.getBrewCount(recipeId).then(function (response) {
                    $scope.brewName = recipeName + ' #' + (response.data.count + 1);
                
                }, function (reason) {
                    Notifier.error(reason);
                });
            }
            
            $scope.submitBrew = function () {
                var newBrewData = $scope.getFormBrewData();
                Brew.save(newBrewData).then(function (response) {
                    $scope.successRedirect('Brew added', '/brew/');
                }, function (reason) {
                    Notifier.error(reason);
                });
            };
        
            BaseCtrl.init(function () {
                $scope.recipes = [];
                $scope.hasRecipes = false;
                $scope.brewUrl = '/brew/';
                $scope.statuses = BrewStatus.getStatuses();

                setDefaultControlValues();
                getCurrentUserRecipes();
            });
        }
    ]);
})();

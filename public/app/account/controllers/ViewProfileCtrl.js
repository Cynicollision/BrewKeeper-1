(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('ViewProfileCtrl',

        ['$scope', '$q', 'BaseCtrl', 'Brew', 'Identity', 'Recipe',

        function ($scope, $q, BaseCtrl, Brew, Identity, Recipe) {
            
            $scope.basicStats = [];
            $scope.mostBrewedRecipes = [];

            BaseCtrl.init(function () {
                
                var basicStats = [],
                    currentUserId = Identity.getCurrentUserId();

                $q.all([
                       
                    Brew.getCountByUserId(currentUserId).then(function (response) {
                        basicStats.push({ name: 'Brew count', value: response.data.count });
                    }),

                    Recipe.getCountByUserId(currentUserId).then(function (response) {
                        basicStats.push({ name: 'Recipe count', value: response.data.count });
                    }),
                     
                    Recipe.getTopBrewedRecipes(currentUserId).then(function (response) {
                        var mostBrewedRecipe = response.data[0];
                        basicStats.push({ name: 'Most Brewed Recipe', value: mostBrewedRecipe.name });

                        $scope.mostBrewedRecipes = response.data;
                    }),

                ])
                .then(function () {
                    $scope.basicStats = basicStats;
                });

            });
        }
    ]);
})();

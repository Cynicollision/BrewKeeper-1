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
                        basicStats.push({
                            name: 'Brew count',
                            value: response.data.count,
                            displayOrder: 1
                        });
                    }),

                    Brew.getFirstBrewByDate(currentUserId).then(function (response) {

                        var value = 'No brews!',
                            brewDate;

                        function formatDate(date) {
                            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                        }

                        if (!response.noBrews) {
                            value = formatDate(new Date(response.brewDate));
                        }

                        basicStats.push({
                            name: 'Brewing since',
                            value: value,
                            displayOrder: 3
                        });
                    }),

                    Recipe.getCountByUserId(currentUserId).then(function (response) {
                        basicStats.push({
                            name: 'Recipe count',
                            value: response.data.count,
                            displayOrder: 2
                        });
                    }),
                     
                    Recipe.getTopBrewedRecipes(currentUserId).then(function (response) {
                        var mostBrewedRecipe = response.data[0],
                            mostBrewedRecipeName = mostBrewedRecipe ? mostBrewedRecipe.name : 'No recipes!';

                        basicStats.push({
                            name: 'Most Brewed Recipe',
                            value: mostBrewedRecipeName,
                            displayOrder: 4
                        });

                        $scope.mostBrewedRecipes = response.data;
                    }),
                ])
                .then(function () {
                    basicStats.sort(function (a, b) {
                        return a.displayOrder - b.displayOrder;
                    });

                    $scope.basicStats = basicStats;
                });
            });
        }
    ]);
})();

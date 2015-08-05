angular.module('BrewKeeper').controller('AddBrewCtrl', function ($scope, $location, Brew, Identity, Notifier, Recipe) {
    $scope.getCurrentUserRecipes = function () {
        Recipe.getByUserId(Identity.getCurrentUserId()).then(function (response) {
            $scope.recipes = response.data;
            if (!!$scope.recipes && $scope.recipes.length > 0) {
                $scope.brewRecipe = $scope.recipes[0];
            }
        });
    };
    
    // TODO: BrewStatus service and get from there
    $scope.statuses = [
        { id: 1, name: "Not started yet" },
        { id: 2, name: "Fermenting" },
        { id: 3, name: "Bottled" },
        { id: 4, name: "Chilling" }
    ];

    $scope.getNewBrewData = function () {
        return {
            batchSize: $scope.brewBatchSize,
            description: $scope.brewDescription,
            ownerId: Identity.getCurrentUserId(),
            recipeId: $scope.brewRecipe._id,
            statusCde: (!!$scope.brewStatusCde) ? $scope.brewStatusCde.id : -1
        };
    };

    $scope.saveBrew = function () {
        var newBrewData = $scope.getNewBrewData();
        Brew.save(newBrewData).then(function (response) {
            if (!response.data.reason) {
                Notifier.notify('Brew added!');
                $location.path('/brews');
            } else {
                Notifier.error(response.data.reason);
            }
        }, function (reason) {
            Notifier.error(reason);
        });
    };
    
    $scope.setDefaultControlValues = function () {
        if (!!$scope.statuses) {
            $scope.brewStatusCde = $scope.statuses[0];
        }
    };
    
    // initialze
    $scope.getCurrentUserRecipes();
    $scope.setDefaultControlValues();
});

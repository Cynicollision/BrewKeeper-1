(function () {
    'use strict';

    describe('recipe/ViewRecipeCtrl', function () {

        var $scope, testRecipe, mockCount, location, RecipeMock;

        testRecipe = {
            _id: 423531,
            name: 'Mock recipe',
            sourceUrl: 'seannormoyle.net'
        };

        mockCount = {
            count: 3
        };

        beforeEach(function () {
            module('BrewKeeper');

            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getBrewCount', 'getByRecipeId']);

            inject(function ($rootScope, $controller, $location, $q) {

                $scope = $rootScope.$new();
                location = $location;

                RecipeMock.getByRecipeId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: testRecipe
                    });
                    return dfd.promise;
                });
                
                RecipeMock.getBrewCount.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockCount
                    });
                    return dfd.promise;
                });

                $controller('ViewRecipeCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: testRecipe._id
                    },
                    $location: $location,
                    Recipe: RecipeMock
                });
            });
        });

        it('Sets the current recipe by retrieving it by the ID specified in the route.', function () {
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(testRecipe._id);
            $scope.$apply();
            expect($scope.recipe).toEqual(testRecipe);
        });
        
        it('Sets how many times the recipe was brewed.', function () {
            expect(RecipeMock.getBrewCount).toHaveBeenCalledWith(testRecipe._id);
            $scope.$apply();
            expect($scope.recipe.timesBrewed).toEqual(mockCount.count);
        });

        it('Can navigate to the "edit recipe" page".', function () {
            $scope.recipe = testRecipe;
            $scope.doEdit();
            expect(location.path()).toEqual('/recipe/edit/' + $scope.recipe._id);
        });

        it('Can navigate to the "delete recipe confirmation" page.', function () {
            $scope.recipe = testRecipe;
            $scope.doDelete();
            expect(location.path()).toEqual('/recipe/delete/' + $scope.recipe._id);
        });
    });
})();

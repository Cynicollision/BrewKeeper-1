(function () {
    'use strict';

    describe('recipe/ViewRecipeCtrl', function () {
        var mockRecipe, mockCount, $scope, location, RecipeMock;

        mockRecipe = {
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
                        data: mockRecipe
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
                        id: mockRecipe._id
                    },
                    $location: $location,
                    Recipe: RecipeMock
                });
            });
        });

        it('Sets the current recipe by retrieving it by the ID specified in the route.', function () {
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(mockRecipe._id);
            $scope.$apply();
            expect($scope.recipe).toEqual(mockRecipe);
        });
        
        it('Sets how many times the recipe was brewed.', function () {
            expect(RecipeMock.getBrewCount).toHaveBeenCalledWith(mockRecipe._id);
            $scope.$apply();
            expect($scope.recipe.timesBrewed).toEqual(mockCount.count);
        });

        it('Can load the "edit recipe" page".', function () {
            $scope.recipe = mockRecipe;
            $scope.doEdit();
            expect(location.path()).toEqual('/recipe/edit/' + $scope.recipe._id);
        });

        it('Can load the "delete recipe confirmation" page".', function () {
            $scope.recipe = mockRecipe;
            $scope.doDelete();
            expect(location.path()).toEqual('/recipe/delete/' + $scope.recipe._id);
        });
    });
})();

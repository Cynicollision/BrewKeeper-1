(function () {
    'use strict';

    describe('recipe/RecipeListCtrl', function () {
        var mockUserId = 82589,
            $scope, location, IdentityMock, RecipeMock, mockRecipes;

        beforeEach(function () {
            module('BrewKeeper');

            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getByUserId']);
            
            mockRecipes = [
                { _id: 1, name: 'recipe1' },
                { _id: 2, name: 'recipe2' },
                { _id: 3, name: 'recipe3' },
                { _id: 4, name: 'recipe4' },
                { _id: 5, name: 'recipe5' },
                { _id: 6, name: 'recipe6' }
            ];
            
            inject(function ($rootScope, $controller, $location, $q) {
                $scope = $rootScope.$new();
                location = $location;

                IdentityMock.getCurrentUserId.and.callFake(function () {
                    return mockUserId;
                });

                RecipeMock.getByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockRecipes
                    });
                    return dfd.promise;
                });

                $controller('RecipeListCtrl', {
                    $scope: $scope,
                    $location: location,
                    Identity: IdentityMock,
                    Recipe: RecipeMock
                });
            });
        });

        it('Retrieves all recipes for the current user.', function () {
            expect(RecipeMock.getByUserId).toHaveBeenCalledWith(mockUserId);
            $scope.$apply();
            expect($scope.recipes).toEqual(mockRecipes);
        });
    });
})();

(function () {
    'use strict';

    describe('recipe/RecipeListCtrl', function () {

        var mockUserId = 82589,
            $scope, IdentityMock, RecipeMock, mockRecipes;

        beforeEach(function () {
            module('BrewKeeper');

            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getByUserId', 'getCountByUserId']);
            
            mockRecipes = [
                { _id: 1, name: 'recipe1' },
                { _id: 2, name: 'recipe2' },
                { _id: 3, name: 'recipe3' },
                { _id: 4, name: 'recipe4' },
                { _id: 5, name: 'recipe5' },
                { _id: 6, name: 'recipe6' }
            ];
            
            inject(function ($rootScope, $controller, $q) {

                $scope = $rootScope.$new();

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
                
                RecipeMock.getCountByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: { count: 7 },
                    });
                    return dfd.promise;
                });

                $controller('RecipeListCtrl', {
                    $scope: $scope,
                    Recipe: RecipeMock,
                    Identity: IdentityMock,
                });
            });
        });
        
        it('Limits the number of initial results to a fixed max amount only if the user has more than the max amount.', function () {
            $scope.listLimit = 5;
            expect(RecipeMock.getCountByUserId).toHaveBeenCalledWith(mockUserId);
            $scope.$apply();
            expect($scope.limitResults).toEqual(true);
        });
        
        it('Doesn\'t limit the number of results when the user has less than the max amount.', function () {
            $scope.listLimit = 11;
            expect(RecipeMock.getCountByUserId).toHaveBeenCalledWith(mockUserId);
            $scope.$apply();
            expect($scope.limitResults).toEqual(false);
        });

        it('Retrieves all recipes for the current user.', function () {
            $scope.getAllCurrentUserRecipes();
            expect(RecipeMock.getByUserId).toHaveBeenCalledWith(mockUserId);
            $scope.$apply();
            expect($scope.recipes).toEqual(mockRecipes);
        });

        it('Sets the default sort order to be recipe name in ascending order', function () {
            expect($scope.predicate).toEqual('name');
            expect($scope.reverse).toEqual(false);
        });
    });
})();

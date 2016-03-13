(function () {
    'use strict';

    describe('recipe/DeleteRecipeCtrl', function () {
        var mockCurrentUserId = 82589,
            $scope, location, IdentityMock, RecipeMock, mockRecipe;
        
        mockRecipe = {
            _id: 2383,
            ownerId: mockCurrentUserId
        };
        
        beforeEach(function () {
            module('BrewKeeper');
            
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getByRecipeId', 'isRecipeOwnedByUser', 'remove']);

            inject(function ($rootScope, $controller, $q, $location) {
                $scope = $rootScope.$new();
                location = $location;
                
                IdentityMock.getCurrentUserId.and.returnValue(mockCurrentUserId);
                
                RecipeMock.getByRecipeId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockRecipe
                    });
                    return dfd.promise;
                });
                
                RecipeMock.isRecipeOwnedByUser.and.callFake(function () {
                    return (mockRecipe.ownerId === mockCurrentUserId);
                });

                RecipeMock.remove.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        success: true
                    });
                    return dfd.promise;
                });

                $controller('DeleteRecipeCtrl', {
                    $scope: $scope,
                    $location: location,
                    $routeParams : {
                        id: mockRecipe._id
                    },
                    Recipe: RecipeMock
                });
            });
        });

        it('Retrieves the current recipe by the ID specified in the route, redirects if user does not own recipe.', function () {
            mockCurrentUserId = -1;
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(mockRecipe._id);
            $scope.$apply();
            expect(location.url()).toEqual('/');
        });
        
        it('Retrieves the current recipe by the ID specified in the route and stores it if the user owns the recipe.', function () {
            mockCurrentUserId = mockRecipe.ownerId;
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(mockRecipe._id);
            $scope.$apply();
            expect($scope.recipe).toEqual(mockRecipe);
        });

        it('Redirects to the recipe list after confirming the deletion of the recipe.', function () {
            $scope.onConfirmDelete();
            expect(RecipeMock.remove).toHaveBeenCalledWith(mockRecipe._id);
            $scope.$apply();
            expect(location.url()).toEqual('/recipe');
        });
    
        it('Redirects to the recipe details page when cancelling the deletion.', function () {
            $scope.onCancelDelete();
            expect(location.url()).toEqual('/recipe/view/' + mockRecipe._id);
        });
    });
})();

(function () {
    'use strict';

    describe('recipe/EditRecipeCtrl', function () {
        var mockCurrentUserId = 82589,
            $scope, location, RecipeMock, IdentityMock, mockRecipe;

        beforeEach(function () {
            module('BrewKeeper');
            
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getByRecipeId', 'update']);
            
            mockRecipe = {
                _id: 825,
                name: 'mock recipe',
                description: 'mock description',
                sourceName: 'src name',
                sourceUrl: 'src url'
            };
            
            inject(function ($controller, $rootScope, $q, $location, $routeParams) {
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
                
                RecipeMock.update.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve();
                    return dfd.promise;
                });

                $controller('EditRecipeCtrl', {
                    $scope: $scope,
                    $routeParams: {
                        id: mockRecipe._id
                    },
                    $location: location,
                    Identity: IdentityMock,
                    Recipe: RecipeMock
                });
            });
        });

        it('Retrieves the given recipe specified in the route.', function () {
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(mockRecipe._id);
            $scope.$apply();

            expect($scope.recipeId).toEqual(mockRecipe._id);
            expect($scope.recipeName).toEqual(mockRecipe.name);
            expect($scope.recipeDescription).toEqual(mockRecipe.description);
            expect($scope.recipeSourceName).toEqual(mockRecipe.sourceName);
            expect($scope.recipeSourceUrl).toEqual(mockRecipe.sourceUrl);
        });

        it('Can retrieve the updated recipe data from the $scope.', function () {
            $scope.recipeId = mockRecipe._id;
            $scope.recipeName = 'wut';
            $scope.recipeDescription = 'recipetest';
            $scope.recipeSourceName = 'test updated src name';
            $scope.recipeSourceUrl = 'www.com';

            var updatedData = $scope.getFormRecipeData();

            expect(updatedData.name).toEqual('wut');
            expect(updatedData.description).toEqual('recipetest');
            expect(updatedData.sourceName).toEqual('test updated src name');
            expect(updatedData.sourceUrl).toEqual('www.com');
        });

        it('Submits the updated recipe data to the Recipe service and redirects to the "view recipe" page.', function () {
            var updatedData = $scope.getFormRecipeData();

            $scope.submitRecipe();
            expect(RecipeMock.update).toHaveBeenCalledWith(updatedData);
            $scope.$apply();
            expect(location.url()).toEqual('/recipe/view/' + updatedData._id);
        });
    });
})();

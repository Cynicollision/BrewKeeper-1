(function () {
    'use strict';
    describe('recipe/AddRecipeCtrl', function () {
        var $scope, location, RecipeMock, IdentityMock;

        beforeEach(function () {
            module('BrewKeeper');

            RecipeMock = jasmine.createSpyObj('Recipe', ['save']);
            IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);
            
            inject(function ($rootScope, $controller, $location, $q) {
                $scope = $rootScope.$new();
                location = $location;

                $controller('AddRecipeCtrl', {
                    $scope: $scope,
                    $location: $location,
                    Recipe: RecipeMock,
                    Identity: IdentityMock
                });

                IdentityMock.getCurrentUserId.and.returnValue(82589);

                RecipeMock.save.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
            });
            
        });

        it('Gets the new recipe data from the form including user ID that created it..', function () {
            $scope.recipeName = 'mock recipe name';
            $scope.recipeDescription = 'some mock description';
            $scope.recipeSource = 'seannormoyle.net';
            $scope.recipeUrl = 'stn';

            var newRecipeData = $scope.getFormRecipeData();
            expect(newRecipeData.ownerId).toEqual(IdentityMock.getCurrentUserId());
            expect(newRecipeData.name).toEqual($scope.recipeName);
            expect(newRecipeData.description).toEqual($scope.recipeDescription);
            expect(newRecipeData.sourceName).toEqual($scope.recipeSourceName);
            expect(newRecipeData.sourceUrl).toEqual($scope.recipeSourceUrl);
        });

        it('Saves a new recipe using the Recipe service.', function () {
            $scope.submitRecipe();
            expect(RecipeMock.save).toHaveBeenCalled();
        });

        it('Redirects to the recipe list on success.', function () {
            $scope.successRedirect();
            expect(location.path()).toBe('/recipe');
        });
    });
})();

(function () {
    'use strict';
    describe('recipe/AddRecipeCtrl', function () {
        var mockOwnerId = 82589, mockRecipe,
            $scope, location, RecipeMock, IdentityMock;
        
        mockRecipe = {
            ownerId: mockOwnerId,
            name: 'mock recipe name',
            description: 'some mock description',
            sourceName: 'stn',
            sourceUrl: 'seannormoyle.net'
        };
        
        function setScopeNewRecipe(scope) {
            scope.recipeName = mockRecipe.name;
            scope.recipeDescription = mockRecipe.description;
            scope.recipeSourceName = mockRecipe.sourceName;
            scope.recipeSourceUrl = mockRecipe.sourceUrl;
        }
        
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
                
                // set a recipe to be saved on the $scope
                setScopeNewRecipe($scope);
                
                // mock services
                IdentityMock.getCurrentUserId.and.returnValue(mockOwnerId);

                RecipeMock.save.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
            });
            
        });

        it('Gets the new recipe data from the form including user ID that created it..', function () {
            var newRecipeData = $scope.getFormRecipeData();

            expect(newRecipeData.ownerId).toEqual(IdentityMock.getCurrentUserId());
            expect(newRecipeData.name).toEqual($scope.recipeName);
            expect(newRecipeData.description).toEqual($scope.recipeDescription);
            expect(newRecipeData.sourceName).toEqual($scope.recipeSourceName);
            expect(newRecipeData.sourceUrl).toEqual($scope.recipeSourceUrl);
        });

        it('Saves a new recipe using the Recipe service, then redirects back to recipe list.', function () {
            $scope.submitRecipe();
            expect(RecipeMock.save).toHaveBeenCalledWith(mockRecipe);
            $scope.$apply();
            expect(location.url()).toEqual('/recipe');
        });
    });
})();

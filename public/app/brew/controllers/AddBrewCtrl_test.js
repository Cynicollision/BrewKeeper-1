(function () {
    'use strict';
    
    describe('brew/AddBrewCtrl', function () {
        var mockUserId = 82589,
            mockRecipeBrewCount = 2,
            $scope, location, mockRecipeCollection, BrewMock, IdentityMock, RecipeMock;
        
        mockRecipeCollection = [
            {
                _id: 654,
                name: 'tasty recipe of goodness'
            }
        ];
        
        beforeEach(function () {
            module('BrewKeeper');

            BrewMock = jasmine.createSpyObj('BrewMock', ['save']);
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getByUserId', 'getCount']);
            
            inject(function ($rootScope, $controller, $location, $q) {
                $scope = $rootScope.$new();
                location = $location;

                BrewMock.save.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                IdentityMock.getCurrentUserId.and.returnValue(mockUserId);

                RecipeMock.getByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockRecipeCollection
                    });
                    return dfd.promise;
                });
                
                RecipeMock.getCount.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: {
                            count: mockRecipeBrewCount
                        }
                    });
                    return dfd.promise;
                });

                $controller('AddBrewCtrl', {
                    $scope: $scope,
                    $location: $location,
                    Brew: BrewMock,
                    Identity: IdentityMock,
                    Recipe: RecipeMock
                });
            });
        });
        
        it('Retrieves the current user\'s recipes and sets the default selection to the first in the collection.', function () {
            expect(RecipeMock.getByUserId).toHaveBeenCalledWith(mockUserId);
            $scope.$apply();
            expect($scope.recipes).toEqual(mockRecipeCollection);
            expect($scope.brewRecipe).toEqual(mockRecipeCollection[0]);
            expect($scope.hasRecipes).toEqual(true);
        });

        it('Saves a new brew using the Brew service.', function () {
            $scope.brewRecipe = {};
            $scope.submitBrew();
            expect(BrewMock.save).toHaveBeenCalled();
        });
        
        it('Sets the default status to the first option.', function () {
            $scope.statuses = [
                { id: 0, label: 'new' }, 
                { id: 1, label: 'wip' }, 
                { id: 2, label: 'complete' }];
            $scope.setDefaultControlValues();
            expect($scope.brewStatusCde).toEqual($scope.statuses[0]);
        });

        it('Sets the default brew name to the recipe name and the number of times it was brewed.', function () {
            $scope.brewRecipe = mockRecipeCollection[0];
            $scope.updateName();
            $scope.$apply();
            expect(RecipeMock.getCount).toHaveBeenCalledWith($scope.brewRecipe._id);
            expect($scope.brewName).toEqual($scope.brewRecipe.name + ' #' + (mockRecipeBrewCount + 1));
        });
    });
})();

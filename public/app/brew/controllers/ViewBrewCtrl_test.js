(function () {
    'use strict';

    describe('brew/ViewBrewCtrl', function () {
        
        var mockCurrentUserId = 82589,
            $scope, BrewMock, IdentityMock, RecipeMock, mockBrew, mockRecipe;
        
        beforeEach(function () {
            module('BrewKeeper');
            BrewMock = jasmine.createSpyObj('BrewMock', ['getByBrewId', 'isBrewOwnedByUser']);
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getCount', 'getByRecipeId']);
            
            mockBrew = {
                _id: 423531,
                name: 'Mock recipe',
                sourceUrl: 'seannormoyle.net',
                recipeId: 9241,
            };
            
            mockRecipe = {
                _id: 5432,
                name: 'Mock recipe'
            };

            inject(function ($rootScope, $controller, $q) {
                $scope = $rootScope.$new();
                
                IdentityMock.getCurrentUserId.and.callFake(function () {
                    return mockCurrentUserId;
                });

                BrewMock.getByBrewId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockBrew
                    });
                    return dfd.promise;
                });
                
                BrewMock.isBrewOwnedByUser.and.callFake(function () {
                    return true;
                });
                
                RecipeMock.getByRecipeId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockRecipe
                    });
                    return dfd.promise;
                });
                
                $controller('ViewBrewCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: mockBrew._id
                    },
                    Brew: BrewMock,
                    Identity: IdentityMock,
                    Recipe: RecipeMock
                });
            });
        });
        
        it('Retrieves a single brew by the id specified in the route.', function () {
            expect(BrewMock.getByBrewId).toHaveBeenCalledWith(mockBrew._id);
            $scope.$apply();
            expect($scope.brew).toEqual(mockBrew);
        });
        
        it('Determines if the current brew is owned by the current user.', function () {
            $scope.brew = mockBrew;
            $scope.isBrewOwnedByCurrentUser();
            expect(BrewMock.isBrewOwnedByUser).toHaveBeenCalledWith(mockBrew, mockCurrentUserId);
        });
        
        it('Retrieves the brew\'s recipe name.', function () {
            $scope.$apply();
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(mockBrew.recipeId);
            expect($scope.recipeName).toEqual(mockRecipe.name);
        });
    });
})();

(function () {
    'use strict';
    
    describe('account/ViewProfileCtrl', function () {
        
        var fakeUserId = 85,
            brewCount = 17, 
            recipeCount = 6,
            $scope, BrewMock, IdentityMock, RecipeMock;
        
        var fakeRecipeCountCollection = [
            { _id: 3001, name: 'recipe1', count: 8 },
            { _id: 3002, name: 'recipe2', count: 2 },
            { _id: 3003, name: 'recipe3', count: 3 },
            { _id: 3004, name: 'recipe4', count: 5 },
            { _id: 3005, name: 'recipe5', count: 0 },
        ];

        beforeEach(function () {

            module('BrewKeeper');

            BrewMock = jasmine.createSpyObj('BrewMock', ['getCountByUserId', 'getFirstBrewByDate']);
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getCountByUserId', 'getTopBrewedRecipes']);

            inject(function ($rootScope, $controller, $q) {
                
                $scope = $rootScope.$new();
                
                BrewMock.getCountByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: { count: recipeCount }
                    });
                    return dfd.promise;
                });

                BrewMock.getFirstBrewByDate.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: {}
                    });
                    return dfd.promise;
                });
                
                IdentityMock.getCurrentUserId.and.returnValue(fakeUserId);
                
                RecipeMock.getCountByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: { count: recipeCount }
                    });
                    return dfd.promise;
                });
                
                RecipeMock.getTopBrewedRecipes.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: fakeRecipeCountCollection
                    });
                    return dfd.promise;
                });

                $controller('ViewProfileCtrl', {
                    $scope: $scope,
                    Brew: BrewMock,
                    Identity: IdentityMock,
                    Recipe: RecipeMock,
                });

                $scope.$apply();
            });
        });

        it('Retrieves brew and recipe stats.', function () {
            expect(BrewMock.getCountByUserId).toHaveBeenCalledWith(fakeUserId);
            expect(BrewMock.getFirstBrewByDate).toHaveBeenCalledWith(fakeUserId);
            expect(RecipeMock.getCountByUserId).toHaveBeenCalledWith(fakeUserId);
            expect(RecipeMock.getTopBrewedRecipes).toHaveBeenCalledWith(fakeUserId);

            expect($scope.basicStats.length).toBe(4);
        });

        it('Retrieves the most frequently brewed recipes.', function () {
            expect($scope.mostBrewedRecipes).toBe(fakeRecipeCountCollection);
        });
    });
})();
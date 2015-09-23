(function () {
    'use strict';

    describe('brew/BrewListCtrl', function () {
        var $scope, BrewMock, IdentityMock, RecipeMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            BrewMock = jasmine.createSpyObj('Brew', ['getByUserId']);
            IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('Recipe', ['getByRecipeId']);
                      
            inject(function ($rootScope, $controller, $q) {
                $scope = $rootScope.$new();
                $scope.recipeNames = [];

                BrewMock.getByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve();
                    return dfd.promise;
                });
                
                RecipeMock.getByRecipeId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve();
                    return dfd.promise;
                });
                
                IdentityMock.getCurrentUserId.and.callFake(function () {
                    return 82589;
                });
                
                $controller('BrewListCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: 123
                    },
                    Brew: BrewMock,
                    Identity: IdentityMock,
                    Recipe: RecipeMock
                });
            });
        });
        
        it('Queries all brews for the given user', function () {
            $scope.getCurrentUserBrews();
            expect(BrewMock.getByUserId).toHaveBeenCalledWith(82589);
        });
        
        it('Defines sort options.', function () {
            expect($scope.sortOptions).toBeDefined();
        });
        
        it('Sets a default sort order', function () {
            expect($scope.sortOrder).toBeDefined();
        });
    });
})();

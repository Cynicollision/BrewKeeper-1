﻿(function () {
    'use strict';

    describe('brew/BrewListCtrl', function () {
        var mockUserId = 82589,
            $scope, BrewMock, IdentityMock, RecipeMock, mockBrews;
        
        mockBrews = [
            { _id: 1, name: 'brew1' },
            { _id: 2, name: 'brew2' },
            { _id: 3, name: 'brew3' },
            { _id: 4, name: 'brew4' },
            { _id: 5, name: 'brew5' },
            { _id: 6, name: 'brew6' }
        ];
        
        beforeEach(function () {
            module('BrewKeeper');
            BrewMock = jasmine.createSpyObj('Brew', ['getByUserId', 'getCountByUserId']);
            IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);
            RecipeMock = jasmine.createSpyObj('Recipe', ['getByRecipeId']);
                      
            inject(function ($rootScope, $controller, $q) {
                $scope = $rootScope.$new();
                $scope.recipeNames = [];

                BrewMock.getByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockBrews
                    });
                    return dfd.promise;
                });
                
                BrewMock.getCountByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: {
                            count: mockBrews.length
                        }
                    });
                    return dfd.promise;
                });
                
                IdentityMock.getCurrentUserId.and.callFake(function () {
                    return mockUserId;
                });

                
                $controller('BrewListCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: 123
                    },
                    Brew: BrewMock,
                    Identity: IdentityMock
                });
            });
        });
        
        it('Limits the number of initial results to a fixed max amount.', function () {
            var testBrewListLimit = 3;
            $scope.listLimit = testBrewListLimit;
            $scope.getTopCurrentUserBrews();
            expect(BrewMock.getCountByUserId).toHaveBeenCalledWith(mockUserId);
            $scope.$apply();
            expect($scope.limitResults).toEqual(true);
        });
        
        it('Queries all brews for the given user', function () {
            $scope.getAllCurrentUserBrews();
            expect(BrewMock.getByUserId).toHaveBeenCalledWith(82589);
            $scope.$apply();
            expect($scope.brews).toEqual(mockBrews);
        });
        
        it('Sets the default sort order to be brew date in reverse chronological order', function () {
            expect($scope.predicate).toEqual('brewDate');
            expect($scope.reverse).toEqual(true);
        });
    });
})();

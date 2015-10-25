(function () {
    'use strict';
    
    describe('brew/EditBrewCtrl', function () {
        var $scope, BrewMock, RecipeMock, mockBrew, mockRecipeCollection;
        
        mockBrew = {
            _id: 825
        };
        
        mockRecipeCollection = [
            {
                _id: 654,
                name: 'tasty recipe of goodness'
            }
        ];
        
        beforeEach(function () {
            module('BrewKeeper');

            BrewMock = jasmine.createSpyObj('BrewMock', ['getByBrewId', 'update']);
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getByUserId']);
            
            inject(function ($rootScope, $controller, $q) {
                $scope = $rootScope.$new();
                
                BrewMock.getByBrewId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockBrew
                    });
                    return dfd.promise;
                });
                
                BrewMock.update.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        success: true
                    });
                    return dfd.promise;
                });
                
                RecipeMock.getByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockRecipeCollection
                    });
                    return dfd.promise;
                });
                
                $controller('EditBrewCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: mockBrew._id
                    },
                    Brew: BrewMock,
                    Recipe: RecipeMock
                });
            });
        });
        
        it('Retrieves a single brew by the id specified in the route.', function () {
            $scope.getBrew(mockBrew._id);
            expect(BrewMock.getByBrewId).toHaveBeenCalledWith(mockBrew._id);
            $scope.$apply();
            expect($scope.brewId).toEqual(mockBrew._id);
        });
        
        it('Can initialize the controller with current brew data.', function () {
            $scope.setCurrentBrew({
                _id: 12345,
                batchSize: 3,
                description: 'test brew',
                recipeId: 9876,
                brewDate: '8/25/1989',
                bottleDate: '6/20/2008',
                chillDate: '5/13/2013',
                statusCde: 0
            });
            
            expect($scope.brewId).toEqual(12345);
            expect($scope.brewBatchSize).toEqual(3);
            expect($scope.brewDescription).toEqual('test brew');
            expect($scope.brewRecipe).toEqual(9876);
            expect($scope.brewStatusCde.id).toEqual(0);
            expect($scope.brewBrewDate).toEqual('8/25/1989');
            expect($scope.brewBottleDate).toEqual('6/20/2008');
            expect($scope.brewChillDate).toEqual('5/13/2013');
        });
        
        it('Can retrieve the updated brew data from the $scope.', function () {
            $scope.brewId = 986;
            $scope.brewBatchSize = 6;
            $scope.brewDescription = 'brew test';
            $scope.brewRecipe = {
                _id: 3574
            };
            $scope.brewStatusCde = {
                id: 2
            };
            $scope.brewBrewDate = '3/14/2015';
            $scope.brewBottleDate = '3/28/2015';
            $scope.brewChillDate = '4/15/2015';
            
            var updatedData = $scope.getFormBrewData();
            
            expect(updatedData.id).toEqual(986);
            expect(updatedData.batchSize).toEqual(6);
            expect(updatedData.description).toEqual('brew test');
            expect(updatedData.recipeId).toEqual(3574);
            expect(updatedData.statusCde).toEqual(2);
            expect(updatedData.brewDate).toEqual('3/14/2015');
            expect(updatedData.bottleDate).toEqual('3/28/2015');
            expect(updatedData.chillDate).toEqual('4/15/2015');
        });
        
        it('Submits the updated brew data to the Brew service.', function () {
            $scope.brewRecipe = {
                id: 0
            };
            $scope.submitBrew();
            expect(BrewMock.update).toHaveBeenCalled();
        });
    });
})();

(function () {
    'use strict';
    
    describe('brew/AddBrewCtrl', function () {
        var $scope, BrewMock, IdentityMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            BrewMock = jasmine.createSpyObj('Brew', ['save']);
            IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);
            
            inject(function ($rootScope, $controller, $q) {
                $scope = $rootScope.$new();
                $controller('AddBrewCtrl', {
                    $scope: $scope,
                    Brew: BrewMock,
                    Identity: IdentityMock
                });
                
                IdentityMock.getCurrentUserId.and.returnValue(82589);
                
                BrewMock.save.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
            });
        });
        
        it('Gets values for the new brew from the form including user ID that created it.', function () {
            $scope.brewStatusCde = { id: 2 };
            $scope.brewDescription = 'an expiriment';
            $scope.brewBatchSize = 5;
            $scope.brewRecipe = {
                _id: '6d63a4g2'
            };
            
            var newBrew = $scope.getFormBrewData();
            expect(newBrew.statusCde).toEqual($scope.brewStatusCde.id);
            expect(newBrew.description).toEqual($scope.brewDescription);
            expect(newBrew.batchSize).toEqual($scope.brewBatchSize);
            expect(newBrew.recipeId).toEqual($scope.brewRecipe._id);
            expect(newBrew.ownerId).toEqual(IdentityMock.getCurrentUserId());
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
    });
})();

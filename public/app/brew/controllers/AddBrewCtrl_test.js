(function () {
    'use strict';
    
    describe('brew/AddBrewCtrl', function () {
        var $scope, BrewMock, IdentityMock, location;
        
        beforeEach(function () {
            module('BrewKeeper');
            BrewMock = jasmine.createSpyObj('Brew', ['save']);
            IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);
            
            inject(function ($rootScope, $controller, $location, $q) {
                $scope = $rootScope.$new();
                location = $location;

                $controller('AddBrewCtrl', {
                    $scope: $scope,
                    $location: $location,
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

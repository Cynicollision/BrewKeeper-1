(function () {
    'use strict';
    
    describe('main/UserHomeCtrl', function () {
        
        var fakeUserId = 1575,
            $scope, BrewMock, IdentityMock;
        
        var fakeBrewCollection = [
            { _id: 2001, name: 'brew1', statusCde: 1 },
            { _id: 2002, name: 'brew2', statusCde: 2 },
            { _id: 2003, name: 'brew3', statusCde: 2 },
            { _id: 2004, name: 'brew4', statusCde: 1 },
            { _id: 2005, name: 'brew5', statusCde: 1 },
            { _id: 2007, name: 'brew5', statusCde: 3 },
            { _id: 2008, name: 'brew5', statusCde: 0 },
        ];

        beforeEach(function () {
            
            module('BrewKeeper');
            
            BrewMock = jasmine.createSpyObj('BrewMock', ['getActiveByUserId']);
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);

            inject(function ($rootScope, $controller, $q) {
                
                $scope = $rootScope.$new();
                
                BrewMock.getActiveByUserId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: fakeBrewCollection,
                    });
                    return dfd.promise;
                });
                
                IdentityMock.getCurrentUserId.and.returnValue(fakeUserId);

                $controller('UserHomeCtrl', {
                    $scope: $scope,
                    Brew: BrewMock,
                    Identity: IdentityMock,
                });
                
                $scope.$apply();
            });
        });
        
        it('Retrieves active brews.', function () {
            expect(BrewMock.getActiveByUserId).toHaveBeenCalledWith(fakeUserId);
        });

        it('Dermines if the user has activity to display.', function () {
            expect($scope.hasActivity).toBe(true);
        });

        it('Filters fermenting and bottled collections.', function () {
            expect($scope.fermentingBrews.length).toBe(3);
            expect($scope.bottledBrews.length).toBe(2);
        });
    });
})();
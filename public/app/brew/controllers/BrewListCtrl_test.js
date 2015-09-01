describe('brew/BrewListCtrl', function () {
    'use strict';

    var brewListScope, BrewMock, succeedPromise, IdentityMock, 
        dummyResponse = {
        data: [
            {
                _id: 123
            },
            {
                _id: 456
            }
        ]
    };
    
    beforeEach(function () {
        module('BrewKeeper');
        BrewMock = jasmine.createSpyObj('Brew', ['getByUserId']);
        IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
        
        inject(function ($rootScope, $controller, $q, Brew) {
            brewListScope = $rootScope.$new();
            BrewMock = Brew;
            
            spyOn(BrewMock, 'getByUserId').and.callFake(function () {
                if (succeedPromise) {
                    return $q.when(dummyResponse);
                }
                else {
                    return $q.reject('Error in getById.');
                }
            });
            
            IdentityMock.getCurrentUserId.and.callFake(function () {
                return 82589;
            });
            
            $controller('BrewListCtrl', {
                $scope: brewListScope,
                $routeParams : {
                    id: 123
                },
                Brew: BrewMock,
                Identity: IdentityMock
            });
        });
    });
    
    it('Queries all brews for the given user', function () {
        succeedPromise = true;
        brewListScope.$digest();
        expect(BrewMock.getByUserId).toHaveBeenCalledWith(82589);
    });

    it('Sets a default sort order', function () {
        expect(brewListScope.sortOrder).toBeDefined();
    });
});

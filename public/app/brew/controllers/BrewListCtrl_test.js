describe('brew/BrewListCtrl', function () {
    'use strict';

    var $scope, BrewMock, succeedPromise, IdentityMock, 
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
            $scope = $rootScope.$new();
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
                $scope: $scope,
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
        $scope.$digest();
        expect(BrewMock.getByUserId).toHaveBeenCalledWith(82589);
    });
    
    it('Defines sort options.', function () {
        expect($scope.sortOptions).toBeDefined();
    });

    it('Sets a default sort order', function () {
        expect($scope.sortOrder).toBeDefined();
    });
});

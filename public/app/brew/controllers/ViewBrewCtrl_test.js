(function () {
    'use strict';

    describe('brew/ViewBrewCtrl', function () {
        
        var $scope, Brew, IdentityMock,
            mockBrewId = 123;
        
        beforeEach(function () {
            module('BrewKeeper');
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            
            inject(function ($rootScope, $controller, _Brew_) {
                $scope = $rootScope.$new();
                Brew = _Brew_;
                
                IdentityMock.getCurrentUserId.and.callFake(function () {
                    return 82589;
                });
                
                $controller('ViewBrewCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: mockBrewId
                    },
                    Brew: Brew,
                    Identity: IdentityMock
                });
            });
        });
        
        it('Retrieves a single brew by the id specified in the route.', function () {
            spyOn(Brew, 'getByBrewId').and.callThrough();
            $scope.getBrew(mockBrewId);
            expect(Brew.getByBrewId).toHaveBeenCalledWith(mockBrewId);
        });
        
        it('Can set the current brew.', function () {
            $scope.setCurrentBrew({});
            expect($scope.brew).toBeDefined();
        });
    });
})();

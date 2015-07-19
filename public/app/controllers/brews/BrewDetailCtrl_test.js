describe('BrewDetailCtrl', function () {
    var $scope, Brew, 
        mockBrewId = 123;
    
    beforeEach(function () {
        module('app');
        IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
     
        inject(function ($rootScope, $controller, _Brew_) {
            $scope = $rootScope.$new();
            Brew = _Brew_;
            
            IdentityMock.getCurrentUserId.and.callFake(function () {
                return 82589;
            });

            $controller('BrewDetailCtrl', {
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

    it('Determines if the current user is the owner (brewedBy) of the brew.', function () {
        expect($scope.isBrewOwner()).toBeFalsy();
        $scope.setCurrentBrew({
            brewedBy: 82589
        });
        expect($scope.isBrewOwner()).toBeTruthy();
        $scope.setCurrentBrew({
            brewedBy: 12345
        });
        expect($scope.isBrewOwner()).toBeFalsy();
    });
});

describe('BrewDetailCtrl', function () {
    var $scope, Brew, 
        mockBrewId = 123;
    
    beforeEach(function () {
        module('app');
        Brew = jasmine.createSpyObj('Brew', ['getByBrewId']);
     
        inject(function ($rootScope, $controller, _Brew_) {
            $scope = $rootScope.$new();
            Brew = _Brew_;
            
            spyOn(Brew, 'getByBrewId').and.callThrough();

            $controller('BrewDetailCtrl', {
                $scope: $scope,
                $routeParams : {
                    id: mockBrewId
                },
                Brew: Brew
            });
        });
    });

    it('Retrieves a single brew by the id specified in the route.', function () {
        expect(Brew.getByBrewId).toHaveBeenCalledWith(mockBrewId);
    });

    it('Can set the current brew.', function () {
        $scope.setCurrentBrew({});
        expect($scope.brew).toBeDefined();
    });
});

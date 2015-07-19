describe('EditBrewCtrl', function () {
    var $scope, Brew, 
        mockBrewId = 825;
    
    beforeEach(function () {
        module('app');

        inject(function ($rootScope, $controller, _Brew_) {
            $scope = $rootScope.$new();
            Brew = _Brew_;

            $controller('EditBrewCtrl', {
                $scope: $scope,
                $routeParams : {
                    id: mockBrewId
                },
                Brew: Brew
            });
        });
    });

    it('Retrieves a single brew by the id specified in the route.', function () {
        spyOn(Brew, 'getByBrewId').and.callThrough();
        $scope.getBrew(mockBrewId);
        expect(Brew.getByBrewId).toHaveBeenCalledWith(mockBrewId);
    });
    
    it('Can initialize the controller with current brew data.', function () {
        $scope.setCurrentBrew({
            _id: 12345,
            name: 'current name',
            brewedOn: '8/25/1989'
        });
        expect($scope.brewId).toEqual(12345);
        expect($scope.name).toEqual('current name');
        expect($scope.brewedOn).toEqual('8/25/1989');
    });

    it('Can retrieve the updated brew data bound to the scope.', function () {
        $scope.brewId = 986;
        $scope.name = 'updated name';
        $scope.brewedOn = '8/26/1989';

        var updatedData = $scope.getBrewUpdateData();

        expect(updatedData.id).toEqual(986);
        expect(updatedData.name).toEqual('updated name');
        expect(updatedData.brewedOn).toEqual('8/26/1989');
    });

    it('Calls the Brew service with the updated brew data.', function () {
        spyOn(Brew, 'update').and.callThrough();
        $scope.update();
        expect(Brew.update).toHaveBeenCalled();
    });
});

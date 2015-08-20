describe('EditBrewCtrl', function () {
    var $scope, Brew, 
        mockBrewId = 825;
    
    beforeEach(function () {
        module('BrewKeeper');

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

    it('Can retrieve the updated brew data bound to the scope.', function () {
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

    it('Calls the Brew service with the updated brew data.', function () {
        $scope.brewRecipe = {
            id: 0
        };

        spyOn(Brew, 'update').and.callThrough();
        $scope.submitBrew();
        expect(Brew.update).toHaveBeenCalled();
    });
});

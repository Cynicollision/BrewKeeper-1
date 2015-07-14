var dummyResponse = {
    data: [
        {
            _id: 123
        }
    ]
};

describe('BrewDetailCtrl', function () {
    var brewDetailScope, succeedPromise, BrewMock;
    
    beforeEach(function () {
        module('app');
        BrewMock = jasmine.createSpyObj('Brew', ['getByBrewId']);
     
        inject(function ($rootScope, $controller, $q, Brew) {
            brewDetailScope = $rootScope.$new();
            BrewMock = Brew;
            
            spyOn(BrewMock, 'getByBrewId').and.callFake(function () {
                if (succeedPromise) {
                    return $q.when(dummyResponse);
                }
                else {
                    return $q.reject('Error in getByBrewId.');
                }
            });

            $controller('BrewDetailCtrl', {
                $scope: brewDetailScope,
                $routeParams : {
                    id: 123
                },
                Brew: BrewMock
            });
        });
    });

    it('Retrieves a single brew by the id specified in the route.', function () {
        expect(BrewMock.getByBrewId).toHaveBeenCalledWith(123);
    });

    it('Can set the current brew.', function () {
        brewDetailScope.setCurrentBrew({});
        expect(brewDetailScope.brew).toBeDefined();
    });
});

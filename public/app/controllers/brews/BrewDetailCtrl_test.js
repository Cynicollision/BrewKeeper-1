var dummyResponse = {
    data: [
        {
            _id: 123
        },
        {
            _id: 456
        }
    ]
};

describe('BrewDetailCtrl', function () {
    var brewDetailScope, succeedPromise, BrewServiceMock, IdentityMock;
    
    beforeEach(function () {
        module('app');
        BrewServiceMock = jasmine.createSpyObj('BrewService', ['queryForUser']);
        IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
        
        inject(function ($rootScope, $controller, $q, BrewService) {
            brewDetailScope = $rootScope.$new();
            BrewServiceMock = BrewService;
            
            spyOn(BrewServiceMock, "queryForUser").and.callFake(function () {
                if (succeedPromise) {
                    return $q.when(dummyResponse);
                }
                else {
                    return $q.reject("Error in queryForUser.");
                }
            });
            
            IdentityMock.getCurrentUserId.and.callFake(function () {
                return 82589;
            });
            
            $controller('BrewDetailCtrl', {
                $scope: brewDetailScope,
                $routeParams : {
                    id: 123
                },
                BrewService: BrewServiceMock,
                Identity: IdentityMock
            });
        });
    });
    
    // TODO: move to BrewListCtrl_test after actually implementing retrieve-1-by-id functionality
    it('Queries all brews for the given user (even though it shouldn\'t)', function () {
        succeedPromise = true;
        brewDetailScope.$digest();
        expect(BrewServiceMock.queryForUser).toHaveBeenCalledWith(82589);
    });

    it('Can set the current brew', function () {
        brewDetailScope.setCurrentBrew({});
        expect(brewDetailScope.brew).toBeDefined();
    });
});

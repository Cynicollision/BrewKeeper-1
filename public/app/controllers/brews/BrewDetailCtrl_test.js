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
    var brewDetailScope, succeedPromise, BrewServiceMock, mvIdentityMock;
    
    beforeEach(function () {
        module('app');
        BrewServiceMock = jasmine.createSpyObj('BrewService', ['queryForUser']);
        mvIdentityMock = jasmine.createSpyObj('mvIdentityMock', ['getCurrentUserId']);
        
        inject(function ($rootScope, $controller, $q) {
            brewDetailScope = $rootScope.$new();
            
            BrewServiceMock.queryForUser.and.callFake(function () {
                if (succeedPromise) {
                    return $q.when({});
                } else {
                    return $q.reject('Something went wrong');
                }
            });


            
            mvIdentityMock.getCurrentUserId.and.callFake(function () {
                return 82589;
            });
            
            $controller('BrewDetailCtrl', {
                $scope: brewDetailScope,
                $routeParams : {
                    id: 123
                },
                BrewService: BrewServiceMock,
                mvIdentity: mvIdentityMock
            });
        });
    });
    
    // TODO: move to BrewListCtrl_test after actually implementing retrieve-1-by-id functionality
    it('Queries all brews for the given user (even though it shouldn\'t)', function () {
        succeedPromise = true;
        brewDetailScope.$digest();
        expect(BrewServiceMock.queryForUser).toHaveBeenCalledWith(82589);
        //expect(brewDetailScope.brew).toBeDefined();
    });

    it('Can set the current brew', function () {
        brewDetailScope.setCurrentBrew({});
        expect(brewDetailScope.brew).toBeDefined();
    });
});

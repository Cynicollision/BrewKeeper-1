describe('BrewDetailCtrl', function () {
    var $scope, ctrl, BrewServiceMock, mvIdentityMock;
    
    beforeEach(function () {
        module('app');
        BrewServiceMock = jasmine.createSpyObj('BrewService', ['queryForUser']);
        mvIdentityMock = jasmine.createSpyObj('mvIdentityMock', ['getCurrentUserId']);
        
        inject(function ($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            
            BrewServiceMock.queryForUser.and.callFake(function () {
                var deferred = $q.defer(),
                    dummyResponse = {
                        data: [
                            {
                                id: 123
                            },
                            {
                                id: 456
                            }
                        ]
                    };
                
                deferred.resolve(dummyResponse);
                return deferred.promise;
            });
            
            mvIdentityMock.getCurrentUserId.and.callFake(function () {
                return 82589;
            });
            
            ctrl = $controller('BrewDetailCtrl', {
                $scope: $scope,
                $routeParams : {
                    id: 123
                },
                BrewService: BrewServiceMock,
                mvIdentity: mvIdentityMock
            });
        });
    });
    
    it('Retrieves a single brew for the current user using the given brew id.', function () {
        $scope.getCurrentUserBrews();
        expect(BrewServiceMock.queryForUser).toHaveBeenCalledWith(82589);




        //expect($scope.brew).toBeDefined();
    });
});

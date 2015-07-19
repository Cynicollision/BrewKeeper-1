describe('AddBrewCtrl', function () {
    var $scope, dfd, ctrl, $timeout, BrewMock, IdentityMock;

    beforeEach(function () {
        module('app');
        BrewMock = jasmine.createSpyObj('Brew', ['save']);
        IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);

        inject(function ($rootScope, $location, $controller, $q) {
            $scope = $rootScope.$new();
            //$timeout = _$timeout_;
 
            ctrl = $controller('AddBrewCtrl', {
                $scope: $scope,
                Brew: BrewMock,
                Identity: IdentityMock
            });

            IdentityMock.getCurrentUserId.and.returnValue(82589);
            BrewMock.save.and.callFake(function () {
                dfd = $q.defer();
                dfd.resolve({ success: true });
                return dfd.promise;
            });
        });
    });
    
    // TODO: still need to determine all fields that will be required for a new brew e.g. batch size
    it('Sets initial values for the brew from the form and the user ID that created it.', function () {
        $scope.name = 'test';
        $scope.brewedOn = '7/7/2015';
        
        var newBrew = $scope.getNewBrewData();
        expect(newBrew.name).toEqual($scope.name);
        expect(newBrew.brewedOn).toEqual($scope.brewedOn);
        expect(newBrew.brewedBy).toBeDefined();
        expect(newBrew.brewedBy).toEqual(IdentityMock.getCurrentUserId());
    });

    it('Saves a new brew using Brew', function () {
        $scope.saveBrew();
        expect(BrewMock.save).toHaveBeenCalled();
    });
});

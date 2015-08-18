describe('AddBrewCtrl', function () {
    var $scope, dfd, ctrl, $timeout, BrewMock, IdentityMock;

    beforeEach(function () {
        module('BrewKeeper');
        BrewMock = jasmine.createSpyObj('Brew', ['save']);
        IdentityMock = jasmine.createSpyObj('Identity', ['getCurrentUserId']);

        inject(function ($rootScope, $location, $controller, $q) {
            $scope = $rootScope.$new();
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
    
    it('Sets initial values for the brew from the form and the user ID that created it.', function () {
        $scope.brewStatusCde = { id: 2 };
        $scope.brewDescription = 'an expiriment';
        $scope.brewBatchSize = 5;
        $scope.brewRecipe = {
            _id: '6d63a4g2'
        };
        
        var newBrew = $scope.getFormBrewData();
        expect(newBrew.statusCde).toEqual($scope.brewStatusCde.id);
        expect(newBrew.description).toEqual($scope.brewDescription);
        expect(newBrew.batchSize).toEqual($scope.brewBatchSize);
        expect(newBrew.recipeId).toEqual($scope.brewRecipe._id);
        expect(newBrew.ownerId).toEqual(IdentityMock.getCurrentUserId());
    });

    it('Saves a new brew using Brew', function () {
        $scope.brewRecipe = {};

        $scope.saveBrew();
        expect(BrewMock.save).toHaveBeenCalled();
    });
});

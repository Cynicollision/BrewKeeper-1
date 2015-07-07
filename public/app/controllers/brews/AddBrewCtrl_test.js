describe('AddBrewCtrl', function () {
    var $scope, ctrl, $timeout, BrewServiceMock;

    beforeEach(function () {
        module('app');
        BrewServiceMock = jasmine.createSpyObj('BrewService', ['save']);

        inject(function ($rootScope, $location, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            //$timeout = _$timeout_;

            BrewServiceMock.save.and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            });

            ctrl = $controller('AddBrewCtrl', {
                $scope: $scope,
                BrewService: BrewServiceMock
            });
        });
    });

    it('Saves a new brew using BrewService', function () {
        $scope.name = 'test';
        $scope.brewedOn = '7/7/2015';
        $scope.brewedBy = -1;

        $scope.saveBrew();
        expect(BrewServiceMock.save).toHaveBeenCalled();
        //$timeout.flush();
    });
});

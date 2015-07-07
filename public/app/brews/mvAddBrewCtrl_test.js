describe('mvAddBrewCtrl', function () {
    var $scope, ctrl, $timeout, BrewServiceMock;

    beforeEach(function () {
        BrewServiceMock = jasmine.createSpyObj('BrewService', ['save']);

        module('app');

        inject(function ($rootScope, $location, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            //$timeout = _$timeout_;

            BrewServiceMock.save.and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            });

            ctrl = $controller('mvAddBrewCtrl', {
                $scope: $scope,
                BrewService: BrewServiceMock
            });
        });
    });

    it('Saves a new brew using BrewService', function () {
        $scope.name = 'test';
        $scope.brewedOn = '7/6/2015';
        $scope.brewedBy = -1;

        $scope.saveBrew();
        expect(BrewServiceMock.save).toHaveBeenCalled();
        //$timeout.flush();
    });
});

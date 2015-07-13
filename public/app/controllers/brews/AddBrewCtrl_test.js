describe('AddBrewCtrl', function () {
    var $scope, ctrl, $timeout, BrewMock;

    beforeEach(function () {
        module('app');
        BrewMock = jasmine.createSpyObj('Brew', ['save']);

        inject(function ($rootScope, $location, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            //$timeout = _$timeout_;

            BrewMock.save.and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            });

            ctrl = $controller('AddBrewCtrl', {
                $scope: $scope,
                Brew: BrewMock
            });
        });
    });

    it('Saves a new brew using Brew', function () {
        $scope.name = 'test';
        $scope.brewedOn = '7/7/2015';
        $scope.brewedBy = -1;

        $scope.saveBrew();
        expect(BrewMock.save).toHaveBeenCalled();
        //$timeout.flush();
    });
});

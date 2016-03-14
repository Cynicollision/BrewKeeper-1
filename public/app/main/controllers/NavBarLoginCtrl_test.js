(function () {
    'use strict';

    describe('main/NavBarLoginCtrl', function () {

        var $scope, AuthMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            AuthMock = jasmine.createSpyObj('AuthMock', ['logoutUser']);
            
            inject(function ($rootScope, $q, $controller) {

                $scope = $rootScope.$new();
                
                AuthMock.logoutUser.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });

                $controller('NavBarLoginCtrl', {
                    $scope: $scope,
                    Auth: AuthMock,
                });
            });
        });
        
        it('Uses the Auth service to log out the current user.', function () {
            $scope.username = 'fwqkqrkewasd';
            $scope.signout();
            $scope.$apply();
            expect(AuthMock.logoutUser).toHaveBeenCalled();
            expect($scope.username).toEqual('');
        });
    });

})();

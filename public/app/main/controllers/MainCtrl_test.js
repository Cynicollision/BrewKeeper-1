(function () {
    'use strict';
    
    describe('main/MainCtrl', function () {
        
        var $scope, AuthMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            AuthMock = jasmine.createSpyObj('AuthMock', ['authenticateUser']);
            
            inject(function ($rootScope, $q, $controller) {
                $scope = $rootScope.$new();
                
                AuthMock.authenticateUser.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                 $controller('MainCtrl', {
                    $scope: $scope,
                    Auth: AuthMock,
                });
            });
        });
        
        it('Uses the Auth service to attempt to sign in the user with the given username and password.', function () {
            $scope.signin('mockUser', 'mockPassword');
            expect(AuthMock.authenticateUser).toHaveBeenCalledWith('mockUser', 'mockPassword');
        });
    });
})();

(function () {
    'use strict';
    
    describe('main/MainCtrl', function () {
        
        var $scope, location, AuthMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            AuthMock = jasmine.createSpyObj('AuthMock', ['authenticateUser']);
            
            inject(function ($rootScope, $q, $controller, $location) {

                $scope = $rootScope.$new();
                location = $location;
                
                AuthMock.authenticateUser.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                 $controller('MainCtrl', {
                    $scope: $scope,
                    $location: location,
                    Auth: AuthMock,
                });
            });
        });
        
        it('Uses the Auth service to attempt to sign in the user with the given username and password.', function () {
            $scope.signin('mockUser', 'mockPassword');
            expect(AuthMock.authenticateUser).toHaveBeenCalledWith('mockUser', 'mockPassword');
        });

        it('Redirects to /home if the user is authenticated.', function () {
            $scope.signin('mockUser', 'mockPassword');
            $scope.$apply();
            expect(location.path()).toEqual('/home');
        });
    });
})();

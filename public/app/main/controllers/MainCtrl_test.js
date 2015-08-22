describe('MainCtrl', function () {
    var $scope, Auth, ctrl;
    
    beforeEach(function () {
        module('BrewKeeper');
        
        inject(function ($rootScope, $q, $controller, _Auth_) {
            $scope = $rootScope.$new();
            Auth = _Auth_;
            
            spyOn(Auth, 'authenticateUser').and.callFake(function () {
                dfd = $q.defer();
                dfd.resolve({ success: true });
                return dfd.promise;
            });
            
            ctrl = $controller('MainCtrl', {
                $scope: $scope,
                Auth: Auth
            });
        });
    });

    it('Uses the Auth service to attempt to sign in the user with the given username and password.', function () {
        $scope.signin('mockUser', 'mockPassword');
        expect(Auth.authenticateUser).toHaveBeenCalledWith('mockUser', 'mockPassword');
    });

});

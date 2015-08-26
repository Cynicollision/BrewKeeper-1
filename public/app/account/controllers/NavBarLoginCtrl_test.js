(function () {
    'use strict';

    describe('NavBarLoginCtrl', function () {
        var $scope, ctrl, Auth;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            inject(function ($rootScope, $q, $controller, _Auth_) {
                $scope = $rootScope.$new();
                Auth = _Auth_;
                
                ctrl = $controller('NavBarLoginCtrl', {
                    $scope: $scope,
                    Auth: Auth
                });
                
                spyOn(Auth, 'authenticateUser').and.callFake(function () {
                    dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                spyOn(Auth, 'logoutUser').and.callFake(function () {
                    $scope.clearCurrentUser();
                    
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
            });
        });
        
        it('Uses the Auth service to log out the current user.', function () {
            $scope.username = 'fwqkqrkewasd';
            $scope.signout();
            expect(Auth.logoutUser).toHaveBeenCalled();
            expect($scope.username).toEqual('');
        });
        
        it('Can clear the currently logged-in user.', function () {
            $scope.username = 'mckUsr';
            $scope.password = 'pssWrd';
            $scope.clearCurrentUser();
            expect($scope.username).toEqual('');
            expect($scope.password).toEqual('');
        });
    });

})();

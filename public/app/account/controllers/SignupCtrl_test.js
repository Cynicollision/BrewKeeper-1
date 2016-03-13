(function () {
    'use strict';

    describe('account/SignupCtrl', function () {
        var $scope, ctrl, location, Auth, Notifier;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            inject(function ($rootScope, $q, $controller, $location, _Auth_, _Notifier_) {
                $scope = $rootScope.$new();
                Auth = _Auth_;
                Notifier = _Notifier_;
                location = $location;
                
                ctrl = $controller('SignupCtrl', {
                    $scope: $scope,
                    $location: $location,
                    Auth: Auth,
                    Notifier: Notifier
                });
                
                spyOn(Auth, 'createUser').and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                spyOn(Auth, 'authenticateUser').and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });

                spyOn(Notifier, 'notify').and.callFake(function () { });
            });
        });

        it('Uses the Auth service to create a user', function () {
            $scope.username = 'testUsername';
            $scope.password = 'five';
            $scope.firstName = 'firstie';
            $scope.lastName = 'zzzz';

            $scope.signup();
            $scope.$apply();

            expect(Auth.createUser).toHaveBeenCalledWith({
                username: 'testUsername',
                password: 'five',
                firstName: 'firstie',
                lastName: 'zzzz',
            });
            
            expect(Auth.authenticateUser).toHaveBeenCalledWith('testUsername', 'five');
        });
    });
})();

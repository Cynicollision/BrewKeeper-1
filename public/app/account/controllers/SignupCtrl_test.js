(function () {
    'use strict';

    describe('SignupCtrl', function () {
        var $scope, ctrl, Auth, Notifier;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            inject(function ($rootScope, $q, $controller, _Auth_, _Notifier_) {
                $scope = $rootScope.$new();
                Auth = _Auth_;
                Notifier = _Notifier_;
                
                ctrl = $controller('SignupCtrl', {
                    $scope: $scope,
                    Auth: Auth,
                    Notifier: Notifier
                });
                
                spyOn(Auth, 'createUser').and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });

                spyOn(Notifier, 'notify').and.callFake(function () {
                    
                });
            });
        });
        
        it('Gets values for the new user from the form.', function () {
            $scope.username = 'youzername';
            $scope.password = 'pdubs';
            $scope.firstName = 'firstie';
            $scope.lastName = 'Normoyle';
            
            var newUserData = $scope.getNewUserData();
            expect(newUserData.username).toEqual('youzername');
            expect(newUserData.password).toEqual('pdubs');
            expect(newUserData.firstName).toEqual('firstie');
            expect(newUserData.lastName).toEqual('Normoyle');
        });

        it('Uses the Auth service to create a user', function () {
            $scope.signup();
            expect(Auth.createUser).toHaveBeenCalled();
        });

        it('Shows a success message after creating an account.', function () {
            $scope.successRedirect();
            expect(Notifier.notify).toHaveBeenCalled();
        });
    });
})();

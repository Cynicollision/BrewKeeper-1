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

                spyOn(Notifier, 'notify').and.callFake(function () { });
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
            $scope.username = 'testUsername';
            $scope.password = 'five';
            $scope.firstName = 'firstie';
            $scope.lastName = 'zzzz';

            $scope.signup();
            console.log('TODO here');
            expect(Auth.createUser).toHaveBeenCalledWith({
                username: 'testUsername',
                password: 'five',
                firstName: 'firstie',
                lastName: 'zzzz'
            });
        });

        it('Shows a success message and redirects to index after creating an account.', function () {
            location.path('/signup');
            $scope.successRedirect();
            expect(Notifier.notify).toHaveBeenCalled();
            expect(location.path()).toBe('/');
        });
    });
})();

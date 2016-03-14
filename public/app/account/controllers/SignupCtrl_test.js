(function () {
    'use strict';

    describe('account/SignupCtrl', function () {

        var $scope, location, AuthMock, NotifierMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            AuthMock = jasmine.createSpyObj('AuthMock', ['createUser', 'authenticateUser']);
            
            NotifierMock = jasmine.createSpyObj('NotifierMock', ['notify']);
            
            inject(function ($rootScope, $q, $controller, $location) {

                $scope = $rootScope.$new();
                location = $location;
                
                AuthMock.authenticateUser.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                AuthMock.createUser.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                NotifierMock.notify.and.returnValue();
                
                $controller('SignupCtrl', {
                    $scope: $scope,
                    $location: $location,
                    Auth: AuthMock,
                    Notifier: NotifierMock,
                });
            });
        });

        it('Uses the Auth service to create a user', function () {
            $scope.username = 'testUsername';
            $scope.password = 'five';
            $scope.firstName = 'firstie';
            $scope.lastName = 'zzzz';

            $scope.signup();
            $scope.$apply();

            expect(AuthMock.createUser).toHaveBeenCalledWith({
                username: 'testUsername',
                password: 'five',
                firstName: 'firstie',
                lastName: 'zzzz',
            });
            
            expect(AuthMock.authenticateUser).toHaveBeenCalledWith('testUsername', 'five');
        });
    });
})();

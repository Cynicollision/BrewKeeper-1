(function () {
    'use strict';
    describe('account/EditProfileCtrl', function () {
        var $scope, $timeout, AuthMock, IdentityMock;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            AuthMock = jasmine.createSpyObj('AuthMock', ['updateCurrentUser']);
            
            IdentityMock = {
                currentUser: {
                    username: 'mockington825',
                    firstName: 'mock',
                    lastName: 'mockington'
                },
            };

            inject(function ($rootScope, $q, $controller) {
                $scope = $rootScope.$new();
                
                AuthMock.updateCurrentUser.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
                });
                
                $controller('EditProfileCtrl', {
                    $scope: $scope,
                    Auth: AuthMock,
                    Identity: IdentityMock,
                });
            });
        });
        
        it('Sets the initial scope data from the given user object.', function () {
            expect($scope.username).toEqual('mockington825');
            expect($scope.firstName).toEqual('mock');
            expect($scope.lastName).toEqual('mockington');
        });

        it('Uses the Auth service to submit updated user profile data.', function () {

            setInitialMockScopeUserData();
            
            $scope.firstName = 'updated_fn';
            $scope.lastName = 'updated_ln';

            $scope.submit();
            
            var updatedUserObj = {
                username: 'mockington825',
                firstName: 'updated_fn',
                lastName: 'updated_ln',
            };

            expect(AuthMock.updateCurrentUser).toHaveBeenCalledWith(updatedUserObj);
        });

        function setInitialMockScopeUserData() {
            $scope.username = IdentityMock.currentUser.username;
            $scope.firstName = IdentityMock.currentUser.firstName;
            $scope.lastName = IdentityMock.currentUser.lastName;
        }
    });
})();

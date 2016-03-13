(function () {
    'use strict';
    describe('account/EditProfileCtrl', function () {
        var $scope, ctrl, $timeout, Auth, IdentityMock, setInitialMockScopeUserData;
        
        beforeEach(function () {
            module('BrewKeeper');
            IdentityMock = {
                currentUser: {
                    username: 'mockington825',
                    firstName: 'mock',
                    lastName: 'mockington'
                },
            };
            
            setInitialMockScopeUserData = function () {
                $scope.username = IdentityMock.currentUser.username;
                $scope.firstName = IdentityMock.currentUser.firstName;
                $scope.lastName = IdentityMock.currentUser.lastName;
            };
            
            inject(function ($rootScope, $q, $controller, _Auth_) {
                $scope = $rootScope.$new();
                Auth = _Auth_;
                
                ctrl = $controller('EditProfileCtrl', {
                    $scope: $scope,
                    Auth: Auth,
                    Identity: IdentityMock
                });
                
                spyOn(Auth, 'updateCurrentUser').and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ success: true });
                    return dfd.promise;
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

            expect(Auth.updateCurrentUser).toHaveBeenCalledWith(updatedUserObj);
        });
    });
})();

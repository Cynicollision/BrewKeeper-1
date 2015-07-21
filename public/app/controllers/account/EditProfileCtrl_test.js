describe('EditBrewCtrl', function () {
    var $scope, ctrl, $timeout, Auth, IdentityMock, setMockScopeUserData;
    
    beforeEach(function () {
        module('BrewKeeper');
        IdentityMock = {
            currentUser: {
                username: 'mockington825',
                firstName: 'mock',
                lastName: 'mockington'
            }
        };
        
        setMockScopeUserData = function () {
            $scope.email = IdentityMock.currentUser.username;
            $scope.fname = IdentityMock.currentUser.firstName;
            $scope.lname = IdentityMock.currentUser.lastName;
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
                dfd = $q.defer();
                dfd.resolve({ success: true });
                return dfd.promise;
            });
        });
    });

    it('Sets the initial scope data from the given user object.', function () {
        $scope.setScopeInitialUserData(IdentityMock.currentUser);
        expect($scope.email).toEqual('mockington825');
        expect($scope.fname).toEqual('mock');
        expect($scope.lname).toEqual('mockington');
    });
    
    it('Retrieves a user object from the scope\'s updated information.', function () {
        setMockScopeUserData();
        
        $scope.fname = 'updated_fn';
        $scope.lname = 'updated_ln';

        var updatedUserData = $scope.getScopeUpdatedUserData();
        expect(updatedUserData.firstName).toEqual('updated_fn');
        expect(updatedUserData.lastName).toEqual('updated_ln');
    });
    
    it('Uses the Auth service to update the current user.', function () {
        setMockScopeUserData();

        $scope.update();
        expect(Auth.updateCurrentUser).toHaveBeenCalledWith(IdentityMock.currentUser);
    });
});

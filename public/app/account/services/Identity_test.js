(function () {
    'use strict';

    describe('account/Identity', function () {
        var Identity, mockUser, $window;
        
        beforeEach(function () {
            module('BrewKeeper');
            inject(function (_$window_, _Identity_) {
                $window = _$window_;
                Identity = _Identity_;
            });
            
            mockUser = {
                _id: 12345,
                roles: ['mockRole']
            };
        });
        
        afterEach(function () {
            Identity.currentUser = $window.bkCurrentUser = null;
        });
        
        it('Assumes -1 as the current user\'s ID if no user is actually logged in.', function () {
            expect(Identity.getCurrentUserId()).toEqual(-1);
        });
        
        it('Can retrieve the current user\'s ID if one is logged in.', function () {
            Identity.currentUser = mockUser;
            var returnedId = Identity.getCurrentUserId();
            expect(returnedId).toEqual(12345);
        });
        
        it('Bootstraps the logged in user from the window object if one is set', function () {
            $window.bkCurrentUser = mockUser;
            Identity.bootstrapCurrentUserFromWindow();
            expect(Identity.currentUser._id).toEqual(mockUser._id);
        });
        
        it('Can determine if a user is logged in or not.', function () {
            expect(Identity.isAuthenticated()).toBeFalsy();
            Identity.currentUser = mockUser;
            expect(Identity.isAuthenticated()).toBeTruthy();
        });
        
        it('Can determine if the current user has a particular user role.', function () {
            expect(Identity.isAuthorized('mockRole')).toBeFalsy();
            Identity.currentUser = mockUser;
            expect(Identity.isAuthorized('mockRole')).toBeTruthy();
        });
    });

})();

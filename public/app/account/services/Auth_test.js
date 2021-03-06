﻿(function () {
    'use strict';

    describe('account/Auth', function () {
        var Auth, BrewKeeperApi, Identity, User, httpBackend, 
            successResponse = {
                success: true
            };
        
        beforeEach(function () {
            module('BrewKeeper');
            inject(function ($injector, _Auth_, _Brew_, _BrewKeeperApi_, _Identity_, _User_) {
                httpBackend = $injector.get('$httpBackend');
                Auth = _Auth_;
                BrewKeeperApi = _BrewKeeperApi_;
                Identity = _Identity_;
                User = _User_;
            });

            spyOn(BrewKeeperApi, 'get').and.callThrough();
            spyOn(BrewKeeperApi, 'post').and.callThrough();
            spyOn(BrewKeeperApi, 'put').and.callThrough();
            
            // make sure to start in a logged-out state 
            Identity.currentUser = undefined;
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('Uses BrewKeeperApi to log in with the given credentials and sets the current user.', function () {
            var result,
                mockCreds = {
                    username: 'yoozer',
                    password: 'letmein'
                };

            httpBackend.expectPOST('/login').respond({
                success: true,
                user: mockCreds
            });
            Auth.authenticateUser(mockCreds.username, mockCreds.password).then(function (response) {
                result = response;
            });
            httpBackend.flush();

            expect(BrewKeeperApi.post).toHaveBeenCalledWith('/login', mockCreds);
            expect(result.success).toBeTruthy();
            expect(result.user.username).toEqual(mockCreds.username);
            expect(result.user.password).toEqual(mockCreds.password);
            expect(Identity.currentUser).toBeDefined();
        });

        it('Creates a new user account with the given user data.', function () {
            var result,
                mockUserResourceInstance,
                mockSignupData = {
                    username: 'yoozer',
                    password: 'letmein',
                    firstName: 'John',
                    lastName: 'Jacobjingleheimerschmit'
                };

            httpBackend.expectPOST('/api/users/').respond(successResponse);
            Auth.createUser(mockSignupData).then(function (response) {
                result = response;
            });
            httpBackend.flush();
            mockUserResourceInstance = new User(mockSignupData);

            expect(BrewKeeperApi.post).toHaveBeenCalledWith('/api/users/', mockSignupData);
            expect(Identity.currentUser).toEqual(mockUserResourceInstance);
            expect(result).toEqual(mockUserResourceInstance);
        });
        
        it('Can update the current user.', function () {
            var result,
                currentUser = {},
                updatedUserData = {
                    username: 'new_username',
                    password: 'new_password',
                    firstName: 'new_fname',
                    lastName: 'new_lname'
                };
            
            Identity.currentUser = currentUser;

            httpBackend.expectPUT('/api/users/').respond(successResponse);
            Auth.updateCurrentUser(updatedUserData).then(function (response) {
                result = response;
            });
            httpBackend.flush();

            expect(BrewKeeperApi.put).toHaveBeenCalledWith('/api/users/', updatedUserData);
            expect(Identity.currentUser).toEqual(updatedUserData);
            expect(result).toEqual(true);
        });

        it('Can log out the current user.', function () {
            var result;
            
            Identity.currentUser = {
                firstName: 'fName',
                lastName: 'lName',
            };

            httpBackend.expectPOST('/logout').respond(successResponse);
            Auth.logoutUser().then(function (response) {
                result = response;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.post).toHaveBeenCalledWith('/logout', { logout: true });
            expect(Identity.currentUser).not.toBeDefined();
        });
    });
})();

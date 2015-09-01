(function () {
    'use strict';

    describe('brew/Brew', function () {
        var Brew, BrewKeeperApi, Identity, httpBackend, 
            successResponse = {
                success: true
            };
        
        beforeEach(function () {
            module('BrewKeeper');
            inject(function ($injector, _Brew_, _BrewKeeperApi_, _Identity_) {
                httpBackend = $injector.get('$httpBackend');
                Brew = _Brew_;
                BrewKeeperApi = _BrewKeeperApi_;
                Identity = _Identity_;
            });
            
            spyOn(BrewKeeperApi, 'get').and.callThrough();
            spyOn(BrewKeeperApi, 'post').and.callThrough();
            spyOn(BrewKeeperApi, 'put').and.callThrough();
            spyOn(BrewKeeperApi, 'delete').and.callThrough();
        });
        
        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
        
        it('Can determine if the currently logged in user owns a brew.', function () {
            Identity.currentUser = { _id: 82589 };
            expect(Brew.isBrewOwnedByCurrentUser({
                ownerId: 82589
            })).toBeTruthy();
            
            Identity.currentUser = { _id: 564198 };
            expect(Brew.isBrewOwnedByCurrentUser({
                ownerId: 82589
            })).toBeFalsy();
        });
        
        it('Can retrieve all brews.', function () {
            var result;
            
            httpBackend.expectGET('/api/brews/').respond(successResponse);
            Brew.getAll().then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.get).toHaveBeenCalledWith('/api/brews/');
            expect(result).toEqual(successResponse);
        });
        
        it('Can retrieve brews for a single user by user ID.', function () {
            var result, 
                mockUserId = 6724;
            
            httpBackend.expectGET('/api/brews/user/' + mockUserId).respond(successResponse);

            Brew.getByUserId(mockUserId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.get).toHaveBeenCalledWith('/api/brews/user/' + mockUserId);
            expect(result).toEqual(successResponse);
        });
        
        it('Can retrieve a single brew by brew ID', function () {
            var result, 
                mockBrewId = 98783;
            
            httpBackend.expectGET('/api/brews/' + mockBrewId).respond(successResponse);
            
            Brew.getByBrewId(mockBrewId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.get).toHaveBeenCalledWith('/api/brews/' + mockBrewId);
            expect(result).toEqual(successResponse);
        });
        
        it('Can save a new brew.', function () {
            var success, mockNewBrewData;
            
            mockNewBrewData = {
                id: 5231,
                name: 'MockBrew'
            };
            
            httpBackend.expectPOST('/api/brews/').respond(200);
            Brew.save(mockNewBrewData).then(function () {
                success = true;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.post).toHaveBeenCalledWith('/api/brews/', mockNewBrewData);
            expect(success).toBeTruthy();
        });
        
        it('Can update a brew.', function () {
            var result, mockUpdatedBrewData,
                mockBrewId = 45343;
            
            mockUpdatedBrewData = {
                id: mockBrewId,
                name: 'updatedBrewName'
            };
            
            httpBackend.expectPUT('/api/brews/').respond(successResponse);
            Brew.update(mockUpdatedBrewData).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.put).toHaveBeenCalledWith('/api/brews/', mockUpdatedBrewData);
            expect(result).toEqual(successResponse);
        });
        
        it('Can delete a brew by ID.', function () {
            var result, 
                mockBrewId = 45343;
            
            httpBackend.expectDELETE('/api/brews/' + mockBrewId).respond(successResponse);
            Brew.delete(mockBrewId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.delete).toHaveBeenCalledWith('/api/brews/' + mockBrewId);
            expect(result).toEqual(successResponse);
        });
    });

})();

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
        
        it('Can determine if a given user ID matches the brew\'s owner ID.', function () {
            var mockBrew = {
                ownerId: 82589
            };

            Identity.currentUser = { _id: 82589 };
            expect(Brew.isBrewOwnedByUser(mockBrew, Identity.currentUser._id)).toBeTruthy();
            
            Identity.currentUser = { _id: 564198 };
            expect(Brew.isBrewOwnedByUser(mockBrew, Identity.currentUser._id)).toBeFalsy();
        });
        
        it('Can retrieve how many brews a user has by user ID.', function () {
            var mockUserId = 2134,
                result,
                getUrl = '/api/brew/user/count/' + mockUserId;

            httpBackend.expectGET(getUrl).respond({
                count: 15
            });

            Brew.getCountByUserId(mockUserId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();

            expect(BrewKeeperApi.get).toHaveBeenCalledWith(getUrl);
            expect(result.count).toEqual(15);
        });
        
        it('Can retrieve all brews for a single user by user ID.', function () {
            var result, 
                mockUserId = 6724,
                getUrl = '/api/brew/user/' + mockUserId + '?limit=0';
            
            httpBackend.expectGET(getUrl).respond(successResponse);

            Brew.getByUserId(mockUserId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.get).toHaveBeenCalledWith(getUrl);
            expect(result).toEqual(successResponse);
        });
        
        it('Can retrieve a specific number of brews for a single user by user ID.', function () {
            var result, 
                mockUserId = 6724,
                limit = 6,
                getUrl = '/api/brew/user/' + mockUserId + '?limit=' + limit;
            
            httpBackend.expectGET(getUrl).respond(successResponse);
            
            Brew.getByUserId(mockUserId, limit).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.get).toHaveBeenCalledWith(getUrl);
            expect(result).toEqual(successResponse);
        });
        
        it('Can retrieve a single brew by brew ID', function () {
            var result, 
                mockBrewId = 98783;
            
            httpBackend.expectGET('/api/brew/' + mockBrewId).respond(successResponse);
            
            Brew.getByBrewId(mockBrewId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.get).toHaveBeenCalledWith('/api/brew/' + mockBrewId);
            expect(result).toEqual(successResponse);
        });
        
        it('Can save a new brew.', function () {
            var success, mockNewBrewData;
            
            mockNewBrewData = {
                id: 5231,
                name: 'MockBrew'
            };
            
            httpBackend.expectPOST('/api/brew/').respond(200);
            Brew.save(mockNewBrewData).then(function () {
                success = true;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.post).toHaveBeenCalledWith('/api/brew/', mockNewBrewData);
            expect(success).toBeTruthy();
        });
        
        it('Can update a brew.', function () {
            var result, mockUpdatedBrewData,
                mockBrewId = 45343;
            
            mockUpdatedBrewData = {
                id: mockBrewId,
                name: 'updatedBrewName'
            };
            
            httpBackend.expectPUT('/api/brew/').respond(successResponse);
            Brew.update(mockUpdatedBrewData).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.put).toHaveBeenCalledWith('/api/brew/', mockUpdatedBrewData);
            expect(result).toEqual(successResponse);
        });
        
        it('Can delete a brew by ID.', function () {
            var result, 
                mockBrewId = 45343;
            
            httpBackend.expectDELETE('/api/brew/' + mockBrewId).respond(successResponse);
            Brew.remove(mockBrewId).then(function (response) {
                result = response.data;
            });
            httpBackend.flush();
            
            expect(BrewKeeperApi.delete).toHaveBeenCalledWith('/api/brew/' + mockBrewId);
            expect(result).toEqual(successResponse);
        });
    });

})();

describe('Brew', function () {
    var Brew, BrewKeeperApi, httpBackend, successResponse;

    beforeEach(function () {
        module('BrewKeeper');
        inject(function ($injector, _Brew_, _BrewKeeperApi_) {
            httpBackend = $injector.get('$httpBackend');

            Brew = _Brew_;
            BrewKeeperApi = _BrewKeeperApi_;
        });

        successResponse = { success: true };

        spyOn(BrewKeeperApi, 'get').and.callThrough();
        spyOn(BrewKeeperApi, 'post').and.callThrough();
    });
    
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    
    it('Can retrieve all brews.', function () {
        var result, url = '/api/brews/';

        httpBackend.expectGET(url).respond(successResponse);

        Brew.getAll().then(function (response) {
            result = response.data;
        });
        httpBackend.flush();

        expect(BrewKeeperApi.get).toHaveBeenCalledWith(url);
        expect(result).toEqual(successResponse);
    });

    it('Can retrieve brews for a single user by user ID.', function () {
        var result, url = '/api/brews/user/', mockUserId = 6724;
        
        spyOn(Brew, 'getByUserId').and.callThrough();
        httpBackend.expectGET(url + mockUserId).respond(successResponse);

        Brew.getByUserId(mockUserId).then(function (response) {
            result = response.data;
        });
        httpBackend.flush();
        
        expect(BrewKeeperApi.get).toHaveBeenCalledWith(url + mockUserId);
        expect(result).toEqual(successResponse);
    });

    it('Can retrieve a single brew by brew ID', function () {
        var result, url = '/api/brews/', mockBrewId = 98783;
        
        spyOn(Brew, 'getByBrewId').and.callThrough();
        httpBackend.expectGET(url + mockBrewId).respond(successResponse);
        
        Brew.getByBrewId(mockBrewId).then(function (response) {
            result = response.data;
        });
        httpBackend.flush();
        
        expect(BrewKeeperApi.get).toHaveBeenCalledWith(url + mockBrewId);
        expect(result).toEqual(successResponse);
    });

    it('Can save a new brew.', function () {
        var success, url = '/api/brews/', mockNewBrewData;
        
        mockNewBrewData = {
            id: 5231,
            name: 'MockBrew'
        };
        
        spyOn(Brew, 'save').and.callThrough();
        httpBackend.expectPOST(url).respond(200);

        Brew.save(mockNewBrewData).then(function () {
            success = true;
        });
        httpBackend.flush();
        
        expect(BrewKeeperApi.post).toHaveBeenCalledWith(url, mockNewBrewData);
        expect(success).toBeTruthy();
    });
});

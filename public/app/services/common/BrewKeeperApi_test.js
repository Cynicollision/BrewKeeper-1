describe('BrewKeeperApi', function () {
    var BrewKeeperApi, httpBackend, successResponse;
    
    beforeEach(function () {
        module('app');
        inject(function ($injector, _BrewKeeperApi_) {
            httpBackend = $injector.get('$httpBackend');
            
            BrewKeeperApi = _BrewKeeperApi_;
        });
        
        successResponse = { success: true };
    });
    
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    
    
    it('Can send a GET request to /api/brews/.', function () {
        var result, url = '/api/brews/';
        
        spyOn(BrewKeeperApi, 'get').and.callThrough();
        httpBackend.expectGET(url).respond(successResponse);
        
        BrewKeeperApi.get(url).then(function (response) {
            result = response.data;
        });
        httpBackend.flush();
        
        expect(result).toEqual(successResponse);
    });
    
    it('Can send a POST request to /api/brews/.', function () {
        var success, url = '/api/brews/', mockData;
        mockData = {
            brew: 'keeper'
        };
        
        spyOn(BrewKeeperApi, 'post').and.callThrough();
        httpBackend.expectPOST(url).respond(200);
        
        BrewKeeperApi.post(url, mockData).then(function () {
            success = true;
        });

        httpBackend.flush();
        
        expect(success).toBeTruthy();
    });
});

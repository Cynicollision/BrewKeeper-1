describe('common/BrewKeeperApi', function () {
    var BrewKeeperApi, httpBackend, successResponse;
    
    beforeEach(function () {
        module('BrewKeeper');
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
    
    
    it('Can send a GET request to /api/brew/.', function () {
        var result;
        
        spyOn(BrewKeeperApi, 'get').and.callThrough();

        httpBackend.expectGET('/api/brew/').respond(successResponse);
        BrewKeeperApi.get('/api/brew/').then(function (response) {
            result = response.data;
        });
        httpBackend.flush();
        
        expect(result).toEqual(successResponse);
    });
    
    it('Can send a POST request to /api/brew/.', function () {
        var success, 
            mockData = {
                brew: 'keeper'
            };
        
        spyOn(BrewKeeperApi, 'post').and.callThrough();

        httpBackend.expectPOST('/api/brew/').respond(200);
        BrewKeeperApi.post('/api/brew/', mockData).then(function () {
            success = true;
        });
        httpBackend.flush();
        
        expect(success).toEqual(true);
    });

    it('Can send a PUT request to /api/brew/.', function () {
        var success,
            mockData = {
                brew: 'keeper'
            };

        spyOn(BrewKeeperApi, 'put').and.callThrough();
        httpBackend.expectPUT('/api/brew').respond(200);
        BrewKeeperApi.put('/api/brew', mockData).then(function () {
            success = true;
        });
        httpBackend.flush();

        expect(success).toEqual(true);
    });

    it('Can send a DELETE request to /api/brew/.', function () {
        var success;

        spyOn(BrewKeeperApi, 'delete').and.callThrough();
        httpBackend.expectDELETE('/api/brew').respond(200);
        BrewKeeperApi.delete('/api/brew').then(function () {
            success = true;
        });
        httpBackend.flush();
        
        expect(success).toEqual(true);
    });
});

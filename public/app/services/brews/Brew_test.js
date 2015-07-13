
describe('Brew', function () {
    var BrewMock,
        httpBackend;
    
    beforeEach(function () {
        module('app');
        inject(function ($injector, _Brew_) {
            BrewMock = _Brew_;
            httpBackend = $injector.get('$httpBackend'); 
        });
    });
    
    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should send the msg and return the response.', function () {
        var returnData = { success: true };
        
        // expectGET to make sure this is called once.
        httpBackend.expectGET('/api/brews').respond(returnData);
        
        // make the call.
        var result, returnedPromise = BrewMock.query();
        returnedPromise.then(function (response) {
            result = response.data;
        });
        
        // flush the backend to "execute" the request to do the expectedGET assertion.
        httpBackend.flush();

        expect(result).toEqual(returnData);
    });
});

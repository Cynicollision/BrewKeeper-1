describe('IdentityService', function () {
    var IdentityServiceMock,
        httpBackend;
    
    beforeEach(function () {
        module('app');
        inject(function ($injector, $window, _IdentityService_) {
            IdentityServiceMock = _IdentityService_;
            httpBackend = $injector.get('$httpBackend');
        });
    });
    
    // make sure no expectations were missed in your tests.
    // (e.g. expectGET or expectPOST)
    //afterEach(function () {
    //    httpBackend.verifyNoOutstandingExpectation();
    //    httpBackend.verifyNoOutstandingRequest();
    //});
    
    it('Should be able to retrieve the current user\'s ID if one is logged in.', function () {
        IdentityServiceMock.currentUser = {
            _id: 12345
        };

        var returnedId = IdentityServiceMock.getCurrentUserId();
        expect(returnedId).toEqual(12345);
    });
});

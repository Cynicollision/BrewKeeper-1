describe('Identity', function () {
    var Identity, mockUser;
    
    beforeEach(function () {
        module('app');
        inject(function (_Identity_) {
            $window = _$window_;
            Identity = _Identity_;
        });
        
        mockUser = {
            _id: 12345,
            roles: ['mockRole']
        };
    });
});

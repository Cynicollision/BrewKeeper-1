(function () {
    'use strict';

    describe('account/User', function () {
        var User;

        beforeEach(function () {
            module('BrewKeeper');
            inject(function (_User_) {
                User = _User_;
            });
        });

        it('Can determine if the user has the admin role.', function () {
            var user = new User();
            user.roles = ['twerp'];
            expect(user.isAdmin()).toEqual(false);
            user.roles.push('admin');
            expect(user.isAdmin()).toEqual(true);
        });
    });
})();

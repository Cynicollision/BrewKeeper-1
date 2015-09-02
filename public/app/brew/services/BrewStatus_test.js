(function () {
    'use strict';

    describe('brew/BrewStatus', function () {
        var BrewStatus;

        beforeEach(function () {
            module('BrewKeeper');
            inject(function (_BrewStatus_) {
                BrewStatus = _BrewStatus_;
            });
        });

        it('Can return a list of possible statuses.', function () {
            var statuses = BrewStatus.getStatuses();
            expect(statuses.length).toBeGreaterThan(1);
            expect(statuses[0].id).toBeDefined();
            expect(statuses[0].name).toBeDefined();
        });

        it('Can retrieve the display name for a status by ID.', function () {
            var display = BrewStatus.getDisplay(0);
            expect(typeof display).toEqual('string');
        });
    });
})();

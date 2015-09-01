describe('common/Notifier', function () {
    var Toastr, Notifier;

    beforeEach(function () {
        module('BrewKeeper');

        inject(function (_Notifier_, _Toastr_) {
            Notifier = _Notifier_;
            Toastr = _Toastr_;
        });

        
    });

    it('Passes messages to Toastr on success', function () {
        spyOn(Toastr, 'success').and.callThrough();
        Notifier.notify('hello');
        expect(Toastr.success).toHaveBeenCalledWith('hello');
    });

    it('Passes messages to Toastr on success', function () {
        spyOn(Toastr, 'error').and.callThrough();
        Notifier.error('bad news');
        expect(Toastr.error).toHaveBeenCalledWith('bad news');
    });
});

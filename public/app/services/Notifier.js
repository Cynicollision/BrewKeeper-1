angular.module('app').value('Toastr', toastr);

angular.module('app').service('Notifier', function (Toastr) {
    this.notify = function (msg) {
        Toastr.success(msg);
        console.log(msg);
    };

    this.error = function (msg) {
        Toastr.error(msg);
        console.log(msg);
    };
});

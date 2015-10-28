(function () {
    'use strict';
    
    var bk = angular.module('BrewKeeper');
    bk.value('Toastr', toastr);
    bk.service('Notifier', ['Toastr', 
        function (Toastr) {
            this.notify = function (msg) {
                Toastr.success(msg);
            };
            
            this.error = function (msg) {
                Toastr.error(msg);
            };
        }
    ]);
})();

(function () {
    'use strict';
    
    angular.module('BrewKeeper').service('DatePicker', function () {
        if ($('.datepicker').datepicker) {
            $('.datepicker').datepicker({
                format: "m/d/yyyy",
                autoclose: true,
                forceParse: false
            });
        }
    });
})();
   
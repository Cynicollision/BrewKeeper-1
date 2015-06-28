angular.module('app').factory('mvDefaultRequest', function () {
    return {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        transform: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        }
    };
});

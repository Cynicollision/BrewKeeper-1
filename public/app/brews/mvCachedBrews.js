angular.module('app').factory('mvCachedBrews', function (mvBrew) {
    var brewList;

    return {
        query: function () {
            if (!brewList) {
                brewList = mvBrew.query();
            }

            return brewList;
        }
    };
});
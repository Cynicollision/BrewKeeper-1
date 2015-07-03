angular.module('app').factory('mvCachedBrews', function (BrewService) {
    var brewList;

    return {
        query: function () {
            if (!brewList) {
                brewList = BrewService.query();
            }
            
            return brewList;
        }
    };
});
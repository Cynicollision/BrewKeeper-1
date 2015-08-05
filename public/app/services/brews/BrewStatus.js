angular.module('BrewKeeper').factory('BrewStatus', function ($q, BrewKeeperApi) {
    var statuses = [
        { id: 0, name: "Not started yet" },
        { id: 1, name: "Fermenting" },
        { id: 2, name: "Bottled" },
        { id: 3, name: "Chilling" }
    ];

    return {
        getDisplay: function (brewStatusCde) {
            if (brewStatusCde >= 0 && brewStatusCde < statuses.length) {
                return statuses[brewStatusCde].name;
            }

            return 'Invalid brewStatusCde';
        },

        getStatuses: function () {
            return statuses;
        }
    };
});

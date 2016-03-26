(function () {
    'use strict';
    
    angular.module('BrewKeeper').factory('BrewStatus', function () {

        var statuses = [
            { id: 0, name: 'Not started yet' },
            { id: 1, name: 'Fermenting' },
            { id: 2, name: 'Bottled' },
            { id: 3, name: 'Chilling' },
            { id: 4, name: 'Gone' }
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
            },

            NotStartedYet: 0,
            Fermenting: 1,
            Bottled: 2,
            Chilling: 3,
            Gone: 4,
        };
    });
})();

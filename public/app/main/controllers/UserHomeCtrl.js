(function () {
    'use strict';
    
    angular.module('BrewKeeper').controller('UserHomeCtrl', 

        ['$scope', '$location', 'BaseCtrl',
        function ($scope, $location, BaseCtrl) {
            
            $scope.noActivity = true;

            BaseCtrl.init(function () {

                // TODO: get active brews (new API call?)
                // set noActivity accordingly
                // show brews in "fermenting" and "bottled" states, with "bottle" and "chill" dates respectively (desc by date)
            });
        }
    ]);
})();

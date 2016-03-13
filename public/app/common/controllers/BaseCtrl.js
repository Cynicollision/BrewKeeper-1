(function () {
    'use strict';
    
    angular.module('BrewKeeper').factory('BaseCtrl',

        ['$location', 'Identity', 'Notifier',
        function ($location, Identity, Notifier) {
            
            function redirectIfNotLoggedIn() {

                if (!Identity.isAuthenticated()) {
                    Notifier.notify('Please log in.');
                    $location.path('/');
                }
            }
            
            return {
                init: function ($scope, scopeInitFn) {
                    
                    redirectIfNotLoggedIn();

                    if (scopeInitFn) {
                        scopeInitFn($scope);
                    }
                },
            };
        }
    ]);
})();

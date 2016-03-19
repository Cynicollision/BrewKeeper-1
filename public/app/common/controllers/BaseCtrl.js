(function () {
    'use strict';
    
    angular.module('BrewKeeper').factory('BaseCtrl',

        ['$location', 'Identity', 'Notifier',
        function ($location, Identity, Notifier) {
            
            function init(scopeInitFn) {
                
                if (!Identity.isAuthenticated()) {
                    errorRedirect('Please log in.', '/');
                }
                
                if (scopeInitFn) {
                    scopeInitFn();
                }
            } 

            function successRedirect(msg, path) {
                Notifier.notify(msg);
                $location.path(path);
            }

            function errorRedirect(msg, path) {
                Notifier.notify(msg);
                $location.path(path);
            }

            return {
                init: init,
                successRedirect: successRedirect,
                errorRedirect: errorRedirect,
            };
        }
    ]);
})();

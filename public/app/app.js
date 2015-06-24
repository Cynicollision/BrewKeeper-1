angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        },

        user: {
            auth: function (mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }

        }
    };

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
    .when('/', {
        templateUrl: '/partials/main/main', 
        controller: 'mvMainCtrl'
    })

    // user stuff
    .when('/admin/users', {
        templateUrl: '/partials/admin/user-list', 
        controller: 'mvUserListCtrl',
        resolve: routeRoleChecks.admin
    })
    
    .when('/signup', {
        templateUrl: '/partials/account/signup', 
        controller: 'mvSignupCtrl'
    })

    .when('/profile', {
        templateUrl: '/partials/account/profile', 
        controller: 'mvProfileCtrl',
        resolve: routeRoleChecks.user
    })

    // brews
    .when('/brews', {
        templateUrl: '/partials/brews/brew-list', 
        controller: 'mvBrewListCtrl'
    })

    .when('/brews/:id', {
        templateUrl: '/partials/brews/brew-details', 
        controller: 'mvBrewDetailCtrl'
    })

    // recipes
    .when('/recipes', {
        templateUrl: '/partials/recipes/recipe-list', 
        controller: 'mvRecipeListCtrl'
    })

    .when('/recipes/:id', {
        templateUrl: '/partials/recipes/recipe-details', 
        controller: 'mvRecipeDetailCtrl'
    });
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

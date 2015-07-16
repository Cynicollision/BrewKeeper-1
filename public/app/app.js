angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function (Auth) {
                return Auth.authorizeCurrentUserForRoute('admin');
            }
        },

        user: {
            auth: function (Auth) {
                return Auth.authorizeAuthenticatedUserForRoute();
            }

        }
    };

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
    .when('/', {
        templateUrl: '/partials/views/main/main', 
        controller: 'mvMainCtrl'
    })

    // user stuff
    .when('/admin/users', {
        templateUrl: '/partials/views/admin/user-list', 
        controller: 'mvUserListCtrl',
        resolve: routeRoleChecks.admin
    })
    
    .when('/signup', {
        templateUrl: '/partials/views/account/signup', 
        controller: 'mvSignupCtrl'
    })

    .when('/profile', {
        templateUrl: '/partials/views/account/profile', 
        controller: 'mvProfileCtrl',
        resolve: routeRoleChecks.user
    })

    // brews
    // TODO: won't need this?
    .when('/brews', {
        templateUrl: '/partials/views/brews/brew-list', 
        controller: 'mvBrewListCtrl'
    })

    .when('/brews/add', {
        templateUrl: '/partials/views/brews/add-brew', 
        controller: 'AddBrewCtrl'
    })

    .when('/brews/', {
        templateUrl: '/partials/views/brews/brew-list', 
        controller: 'BrewListCtrl'
    })

    .when('/brews/:id', {
        templateUrl: '/partials/views/brews/brew-details', 
        controller: 'BrewDetailCtrl'
    })

    // recipes
    // TODO: won't need this?
    .when('/recipes', {
        templateUrl: '/partials/views/recipes/recipe-list', 
        controller: 'mvRecipeListCtrl'
    })

    .when('/recipes/view/:id', {
        templateUrl: '/partials/views/recipes/recipe-details', 
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

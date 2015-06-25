﻿angular.module('app', ['ngResource', 'ngRoute']);

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
    // TODO: won't need this?
    .when('/brews', {
        templateUrl: '/partials/brews/brew-list', 
        controller: 'mvBrewListCtrl'
    })

    .when('/brews/add', {
        templateUrl: '/partials/brews/add-brew', 
        controller: 'mvAddBrewCtrl'
    })

    .when('/brews/:user', {
        templateUrl: '/partials/brews/brew-list', 
        controller: 'mvBrewListCtrl'
    })

    .when('/brews/view/:id', {
        templateUrl: '/partials/brews/brew-details', 
        controller: 'mvBrewDetailCtrl'
    })

    // recipes
    // TODO: won't need this?
    .when('/recipes', {
        templateUrl: '/partials/recipes/recipe-list', 
        controller: 'mvRecipeListCtrl'
    })

    .when('/recipes/view/:id', {
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

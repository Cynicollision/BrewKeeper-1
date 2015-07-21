angular.module('BrewKeeper', ['ngResource', 'ngRoute']);

angular.module('BrewKeeper').config(function ($routeProvider, $locationProvider) {
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
        controller: 'MainCtrl'
    })

    // account
    .when('/admin/users', {
        templateUrl: '/partials/views/admin/user-list', 
        controller: 'UserListCtrl',
        resolve: routeRoleChecks.admin
    })
    
    .when('/signup', {
        templateUrl: '/partials/views/account/signup', 
        controller: 'SignupCtrl'
    })

    .when('/profile', {
        templateUrl: '/partials/views/account/profile', 
        controller: 'EditProfileCtrl',
        resolve: routeRoleChecks.user
    })

    // brews
    .when('/brews', {
        templateUrl: '/partials/views/brews/brew-list', 
        controller: 'BrewListCtrl'
    })

    .when('/brews/add', {
        templateUrl: '/partials/views/brews/add-brew', 
        controller: 'AddBrewCtrl'
    })

    .when('/brews/:id', {
        templateUrl: '/partials/views/brews/brew-details', 
        controller: 'BrewDetailCtrl'
    })

    .when('/brews/edit/:id', {
        templateUrl: '/partials/views/brews/edit-brew', 
        controller: 'EditBrewCtrl'
    })

    // recipes
    .when('/recipes', {
        templateUrl: '/partials/views/recipes/recipe-list', 
        controller: 'RecipeListCtrl'
    })

    .when('/recipes/view/:id', {
        templateUrl: '/partials/views/recipes/recipe-details', 
        controller: 'RecipeDetailCtrl'
    });
});

angular.module('BrewKeeper').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

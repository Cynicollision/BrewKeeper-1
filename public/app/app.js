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
        templateUrl: '/partials/main/views/main', 
        controller: 'MainCtrl'
    })

    // account
    .when('/signup', {
        templateUrl: '/partials/account/views/signup', 
        controller: 'SignupCtrl'
    })

    .when('/profile', {
        templateUrl: '/partials/account/views/profile', 
        controller: 'EditProfileCtrl',
        resolve: routeRoleChecks.user
    })

    // brew
    .when('/brew', {
        templateUrl: '/partials/brew/views/brew-list', 
        controller: 'BrewListCtrl'
    })

    .when('/brew/add', {
        templateUrl: '/partials/brew/views/add-brew', 
        controller: 'AddBrewCtrl'
    })

    .when('/brew/:id', {
        templateUrl: '/partials/brew/views/view-brew', 
        controller: 'ViewBrewCtrl'
    })

    .when('/brew/edit/:id', {
        templateUrl: '/partials/brew/views/add-brew', 
        controller: 'EditBrewCtrl'
    })

    .when('/brew/delete/:id', {
        templateUrl: '/partials/brew/views/delete-brew', 
        controller: 'DeleteBrewCtrl'
    })

    // recipes
    .when('/recipe', {
        templateUrl: '/partials/recipe/views/recipe-list', 
        controller: 'RecipeListCtrl'
    })

    .when('/recipe/view/:id', {
        templateUrl: '/partials/recipe/views/recipe-details', 
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

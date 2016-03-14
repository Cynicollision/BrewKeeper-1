(function () {
    'use strict';

    angular.module('BrewKeeper', ['ngResource', 'ngRoute']).config(['$routeProvider', '$locationProvider',

        function ($routeProvider, $locationProvider) {

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
            
            // ROUTES        
            $routeProvider

            .when('/', {
                templateUrl: '/partials/main/views/main', 
                controller: 'MainCtrl'
            })

            .when('/home', {
                templateUrl: '/partials/main/views/user-home',
                controller: 'UserHomeCtrl',
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
                    templateUrl: '/partials/brew/views/add-edit-brew', 
                    controller: 'AddBrewCtrl'
                })

            .when('/brew/view/:id', {
                    templateUrl: '/partials/brew/views/view-brew', 
                    controller: 'ViewBrewCtrl'
                })

            .when('/brew/edit/:id', {
                    templateUrl: '/partials/brew/views/add-edit-brew', 
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
                    templateUrl: '/partials/recipe/views/view-recipe', 
                    controller: 'ViewRecipeCtrl'
                })

            .when('/recipe/add', {
                    templateUrl: '/partials/recipe/views/edit-recipe', 
                    controller: 'AddRecipeCtrl'
                })

            .when('/recipe/edit/:id', {
                    templateUrl: '/partials/recipe/views/edit-recipe', 
                    controller: 'EditRecipeCtrl'
                })

            .when('/recipe/delete/:id', {
                    templateUrl: '/partials/recipe/views/delete-recipe', 
                    controller: 'DeleteRecipeCtrl'
                });
        }
    ]);

    angular.module('BrewKeeper').run(['$rootScope', '$location',
        function ($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
                if (rejection === 'not authorized') {
                    $location.path('/');
                }
            });
        }
    ]);
})();

(function () {
    'use strict';

    module.exports = function (grunt) {

        // load tasks
        grunt.loadNpmTasks('grunt-exec');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');

        var fileLists = getFileLists(),
            allProdFiles = fileLists.vendorMinFiles.concat(fileLists.appProdFiles);

        console.log('Production app files (incl. vendor): ' + allProdFiles.length);
        
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            
            exec: {
                mongod_local: 'mongod --dbpath C:\\mongodata'
            },
            
            jshint: {
                all: fileLists.serverFiles.concat(fileLists.appFilesWithTests)
            },
            
            jasmine: {
                'angular-tests': {
                    src: fileLists.vendorDebugFiles.concat(fileLists.appFilesWithTests)
                }
            },
            
            clean: {
                'public/brewkeeper.min.js': [ 
                    'public/application.js',
                    'public/application-debug.js',
                    'public/application-debug.min.js',
                    'public/brewkeeper.min.js',
                ]
            },
            
            uglify: {
                all: {
                    files: {
                        'public/brewkeeper.min.js': [
                            fileLists.appProdFiles
                        ]
                    }
                }
            },

            concat: {
                dist: {
                    src: fileLists.vendorMinFiles.concat(fileLists.appProdFiles),
                    dest: 'public/application.js',
                },
                
                debug: {
                    src: fileLists.vendorDebugFiles.concat(fileLists.appProdFiles),
                    dest: 'public/application-debug.js',
                }
            },
        });

        grunt.registerTask('test', ['jshint', 'jasmine']);
        grunt.registerTask('mongod', 'exec');
        grunt.registerTask('build', ['clean', 'uglify', 'concat']);
        
        grunt.registerTask('default', function () {
            grunt.log.write('So vast!').ok();
        });
    };

    function getFileLists() {
        return {
            appFilesWithTests: [
                'public/app/app.js',
                'public/app/account/controllers/*.js',
                'public/app/account/services/*.js',
                'public/app/brew/controllers/*.js',
                'public/app/brew/services/*.js',
                'public/app/common/controllers/*.js',
                'public/app/common/services/*.js',
                'public/app/main/controllers/*.js',
                'public/app/recipe/services/*.js',
                'public/app/recipe/controllers/*.js'
            ],
            
            vendorDebugFiles: [
                'public/vendor/jquery/dist/jquery.js',
                'public/vendor/angular/angular.js',
                'public/vendor/angular-resource/angular-resource.js',
                'public/vendor/angular-route/angular-route.js',
                'public/vendor/angular-mocks/angular-mocks.js',
                'public/vendor/bootstrap/dist/js/bootstrap.js',
                'public/vendor/datepicker/js/bootstrap-datepicker.js',
                'public/vendor/toastr/toastr.js'
            ],
            
            vendorMinFiles: [
                'public/vendor/jquery/dist/jquery.min.js',
                'public/vendor/angular/angular.min.js',
                'public/vendor/angular-resource/angular-resource.min.js',
                'public/vendor/angular-route/angular-route.min.js',
                'public/vendor/bootstrap/dist/js/bootstrap.min.js',
                'public/vendor/datepicker/js/bootstrap-datepicker.js',
                'public/vendor/toastr/toastr.min.js'
            ],
            
            serverFiles: [
                'server.js', 
                'server/controllers/*.js',
                'server/config/*.js',
                'server/models/*.js',
                'server/utilities/*.js'
            ],
            
            appProdFiles: [
                'public/app/app.js',
                'public/app/account/controllers/EditProfileCtrl.js',
                'public/app/account/controllers/SignupCtrl.js',
                'public/app/account/services/Auth.js',
                'public/app/account/services/Identity.js',
                'public/app/account/services/User.js',
                'public/app/brew/controllers/AddBrewCtrl.js',
                'public/app/brew/controllers/BaseAddEditBrewCtrl.js',
                'public/app/brew/controllers/BrewListCtrl.js',
                'public/app/brew/controllers/DeleteBrewCtrl.js',
                'public/app/brew/controllers/EditBrewCtrl.js',
                'public/app/brew/controllers/ViewBrewCtrl.js',
                'public/app/brew/services/Brew.js',
                'public/app/brew/services/BrewStatus.js',
                'public/app/common/controllers/BaseCtrl.js',
                'public/app/common/services/BrewKeeperApi.js',
                'public/app/common/services/DatePicker.js',
                'public/app/common/services/Notifier.js',
                'public/app/main/controllers/MainCtrl.js',
                'public/app/main/controllers/NavBarLoginCtrl.js',
                'public/app/main/controllers/UserHomeCtrl.js',
                'public/app/recipe/controllers/AddRecipeCtrl.js',
                'public/app/recipe/controllers/DeleteRecipeCtrl.js',
                'public/app/recipe/controllers/EditRecipeCtrl.js',
                'public/app/recipe/controllers/RecipeListCtrl.js',
                'public/app/recipe/controllers/ViewRecipeCtrl.js',
                'public/app/recipe/services/Recipe.js'
            ],
        }
    }
})();

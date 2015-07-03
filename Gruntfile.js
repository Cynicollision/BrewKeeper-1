module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [  
                'server.js', 
                'public/app/*.js',
                'public/app/account/*.js',
                'public/app/admin/*.js',
                'public/app/brews/*.js',
                'public/app/recipes/*.js',
                'public/app/common/*.js',
                'public/app/main/*.js',
                'server/config/*.js',
                'server/controllers/users.js',
                'server/models/*.js',
                'server/utilities/*.js'
            ]
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'public/vendor/angular/angular.min.js',
                        'public/vendor/angular-resource/angular-resource.js',
                        'public/vendor/angular-route/angular-route.js',
                        'public/vendor/angular-mocks/angular-mocks.js',
                        'public/vendor/toastr/toastr.min.js',
                        'public/app/app.js',
                        'public/app/common/*.js',
                        'public/app/brews/*.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.registerTask('test', [ 'jshint', 'karma']);
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};

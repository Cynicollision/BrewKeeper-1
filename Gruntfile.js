module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [  
                
                'public/app/*.js',
                'public/app/main/*.js',
           
                'public/app/services/*.js',

                'public/app/services/brews/*.js',
                'public/app/controllers/brews/*.js',

                // TODO these will move: 
                'public/app/account/*.js',
                'public/app/admin/*.js',
                'public/app/recipes/*.js',
                'public/app/common/*.js',
                // END TODO

                'server.js', 
                'server/controllers/*.js',
                'server/config/*.js',
                'server/models/*.js',
                'server/utilities/*.js'
            ]
        },

        //karma: {
        //    unit: {
        //        options: {
        //            frameworks: ['jasmine'],
        //            singleRun: true,
        //            browsers: ['PhantomJS'],
        //            files: [
        //                'public/vendor/angular/angular.js',
        //                'public/vendor/angular-resource/angular-resource.js',
        //                'public/vendor/angular-route/angular-route.js',
        //                'public/vendor/angular-mocks/angular-mocks.js',
        //                'public/vendor/jquery/dist/jquery.js',
        //                'public/vendor/toastr/toastr.js',
        //                'public/app/*.js',
        //                'public/app/account/*.js',
        //                'public/app/brews/*.js',
        //                'public/app/common/*.js'
        //            ]
        //        }
        //    }
        //},
        
        jasmine: {
            'run-all-tests': {
                src: [
                    'public/vendor/angular/angular.js',
                    'public/vendor/angular-resource/angular-resource.js',
                    'public/vendor/angular-route/angular-route.js',
                    'public/vendor/angular-mocks/angular-mocks.js',
                    'public/vendor/jquery/dist/jquery.js',
                    'public/vendor/toastr/toastr.js',
                    'public/app/*.js',

                    // TODO: these will move
                    'public/app/account/*.js',
                    'public/app/common/*.js',
                    // END TODO

                    'public/app/services/*.js',
                    'public/app/services/account/*.js',
                    'public/app/services/brews/*.js',
                    'public/app/controllers/brews/*.js'
                ]
            }
        }
    });
    
    // TODO: don't need grunt-contrib-jasmine AND grunt-karma
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-karma');
    
    grunt.registerTask('test', [ 'jshint', 'jasmine']);
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};

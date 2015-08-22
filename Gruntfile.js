﻿module.exports = function (grunt) {
    var angularFiles, vendorFiles, serverFiles;
    
    angularFiles = [
        'public/app/app.js',
        'public/app/account/controllers/*.js',
        'public/app/account/services/*.js',
        'public/app/brew/controllers/*.js',
        'public/app/brew/services/*.js',
        'public/app/common/services/*.js',
        'public/app/main/controllers/*.js',
        'public/app/recipe/services/*.js',
        'public/app/recipe/controllers/*.js'
    ];
    
    vendorFiles = [
        'public/vendor/angular/angular.js',
        'public/vendor/angular-resource/angular-resource.js',
        'public/vendor/angular-route/angular-route.js',
        'public/vendor/angular-mocks/angular-mocks.js',
        'public/vendor/jquery/dist/jquery.js',
        'public/vendor/toastr/toastr.js'
    ];
    
    serverFiles = [
        'server.js', 
        'server/controllers/*.js',
        'server/config/*.js',
        'server/models/*.js',
        'server/utilities/*.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: serverFiles.concat(angularFiles)
        },

        jasmine: {
            'angular-tests': {
                src: vendorFiles.concat(angularFiles)
            }
		},

		exec: {
			mongod_local: 'mongod --dbpath C:\\mongodata'
		}
	});
	

	grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('mongod', 'exec');
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};

module.exports = function (grunt) {
    var angularFiles, vendorFiles, serverFiles;
    
    angularFiles = [
        'public/app/app.js',
        'public/app/controllers/account/*.js',
        'public/app/controllers/admin/*.js',
        'public/app/controllers/brews/*.js',
        'public/app/controllers/main/*.js',
        'public/app/controllers/recipes/*.js',
           
        'public/app/services/*.js',
        'public/app/services/account/*.js',
        'public/app/services/brews/*.js',
        'public/app/services/common/*.js',
        'public/app/services/recipes/*.js'
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
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('test', [ 'jshint', 'jasmine']);
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};

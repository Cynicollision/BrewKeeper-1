module.exports = function (grunt) {

    // init
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    

    // register the tasks
    grunt.registerTask('hint', 'jshint');
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};
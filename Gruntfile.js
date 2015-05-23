module.exports = function (grunt) {

    // init
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['public/app/*.js', 'server.js', ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    

    // register the tasks
    grunt.registerTask('hint', 'jshint');
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};
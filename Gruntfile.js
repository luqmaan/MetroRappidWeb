module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            all: {
                options: {
                    port: 3713,
                    hostname: '0.0.0.0',
                    base: 'app',
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            app: {
                files: ['app/*', 'app/js/*.js', 'app/css/*.css', 'app/partials/*.html'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', [
        'open',
        'connect',
        'watch'
    ]);

};

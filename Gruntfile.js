module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            all: {
                options: {
                    port: 3713,
                    hostname: '0.0.0.0',
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>/app'
            }
        },
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            sass: {
                files: ['app/scss/*.scss'],
                tasks: ['build_sass'],
            },
            app: {
                files: ['app/*', 'app/js/*.js', 'app/css/*.css', 'app/partials/*.html'],
                options: {
                    livereload: true,
                },
            }
        },
        exec: {
            copy_foundation: {
                command: 'cp -r bower_components/foundation/scss app/scss/foundation'
            }
        },
        sass: {
            dist: {
                files: {
                    'main.css': 'main.scss'
                }
            },
            dev: {
                options: {
                    includePaths: [
                        'app/scss'
                    ]
                },
                files: {
                    'app/css/main.css': 'app/scss/main.scss'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['open','connect','watch','karma']);
    grunt.registerTask('install', ['exec:copy_foundation']);
    grunt.registerTask('build_sass', ['sass:dev']);
    grunt.registerTask('test', ['karma']);

};

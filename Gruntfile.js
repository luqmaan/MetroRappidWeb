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
            options: {
                livereload: true,
            },
            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            sass: {
                files: ['app/sass/*.sass'],
                tasks: ['build_sass'],
            },
            app: {
                files: ['app/*', 'app/js/*.js', 'app/css/*.css', 'app/partials/*.html'],
            }
        },
        exec: {
            copy_bourbon: {
                command: 'cp -r bower_components/bourbon/app/assets/stylesheets app/sass/bourbon'
            },
            copy_neat: {
                command: 'cp -r bower_components/neat/app/assets/stylesheets app/sass/neat'
            },
            install_sass_to_scss: {
                command: 'git submodule add git@github.com:luqmaan/sass_to_scss.git &&  git submodule update --recursive',
                exitCode: [0, 1]  // ignore submodule init directory already exists error so the next task can run
            },
            sass_to_scss: {
                command: 'python sass_to_scss/sass_to_scss.py app/sass/main.sass && python sass_to_scss/sass_to_scss.py app/sass/grid-settings.sass'
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
                        'app/sass'
                    ]
                },
                files: {
                    'app/css/main.css': 'app/sass/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-sass');


    grunt.registerTask('default', [
        'open',
        'connect',
        'watch'
    ]);

    grunt.registerTask('install', [
        'exec:install_sass_to_scss',
        'exec:copy_bourbon',
        'exec:copy_neat',
    ]);

    grunt.registerTask('build_sass', [
        'exec:sass_to_scss',
        'sass:dev'
    ]);
};

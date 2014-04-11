module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // JAVASCRIPT

        jshint: {
            // files: ['assets/js/*.js'],
            options: {
                ignores: ['assets/js/build/*.js']
            },
            ignore_warning: {
                options: {
                    '-W099': true
                },
                src: ['assets/js/*.js']
            }

        },

        uglify: {
            build: {
                src  : 'assets/js/build/production.js',
                dest : 'assets/js/build/production.min.js'
            }
        },

        // CSS

        autoprefixer: {
            file: {
                src  : 'assets/css/style.css',
                dest : 'assets/css/style.css'
            }
        },

        compass: {
            dev: {
                options: {
                    app         : 'stand_alone',
                    sassDir     : 'assets/css',
                    cssDir      : 'assets/css',
                    outputStyle : 'nested',
                    environment : 'development'
                }
            }
        },

        cssmin: {
            minify: {
                files: {
                    'assets/css/style.css' : 'assets/css/style.css',
                    'assets/css/ie8.css'   : 'assets/css/ie8.css',
                    'assets/css/ie9.css'   : 'assets/css/ie9.css'
                }
            }
        },

        // IMAGES

        imagemin: {
            dynamic: {
                files: [{
                    expand : true,
                    cwd    : 'assets/img/',
                    src    : ['*.{png,jpg,gif}'],
                    dest   : 'assets/img/'
                }]
            }
        },

        // WATCH
        
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/css/*.scss'],
                tasks: ['compass', 'autoprefixer', 'cssmin'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },
            images: {
                files: ['assets/img/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch', 'concat', 'uglify']);

};
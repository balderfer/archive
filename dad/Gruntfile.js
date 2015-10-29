module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'stylesheets/base.css': 'stylesheets/base.scss'
                }
            }
        },
        autoprefixer: {
            single_file: {
                src: 'stylesheets/base.css',
                dest: 'stylesheets/base.css'
            }
        },
        watch: {
            source: {
                files: ['**/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true, // needed to run LiveReload
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-livereload');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['sass', 'autoprefixer']);
};
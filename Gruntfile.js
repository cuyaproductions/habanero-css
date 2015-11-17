module.exports = function (grunt) {
    grunt.initConfig({
        src_dir: 'src',
        build_dir: 'build',
        build_name: 'habanero',

        sass: {
            options: {
                style: 'compressed',
                sourcemap: 'none'
            },
            base: {
                src: ['<%= src_dir %>/sass/<%= build_name %>.s?(a|c)ss'],
                dest: '<%= src_dir %>/css/<%= build_name %>.css'
            },
            theme: {
                src: ['<%= src_dir %>/sass/theme/theme.s?(a|c)ss'],
                dest: '<%= src_dir %>/css/theme.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            files: {
                expand: true,
                cwd: '<%= src_dir %>/css/',
                src: '*.css',
                dest: '<%= build_dir %>/css/',
                extDot: '.min.css'
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    base: 'build',
                    port: 9000
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            base: {
                files: ['<%= src_dir %>/sass/*.s?(a|c)ss', '<%= src_dir %>/sass/**/*.s?(a|c)ss'],
                tasks: ['sass:base', 'autoprefixer']
            },
            theme: {
                files: ['<%= src_dir %>/sass/theme/*.s?(a|c)ss', '<%= src_dir %>/sass/theme/**/*.s?(a|c)ss'],
                tasks: ['sass:theme', 'autoprefixer']
            }


        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('serve', ['connect', 'watch']);
}

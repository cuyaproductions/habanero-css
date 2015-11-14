module.exports = function (grunt) {
    grunt.initConfig({
        src_dir: 'src',
        build_dir: 'build',
        build_name: 'habanero',

        sass: {
            options: {
                style: 'compressed',
                loadPath: require('node-bourbon').includePaths,
                sourcemap: 'none'
            },
            base: {
                src: ['<%= src_dir %>/<%= build_name %>.s?(a|c)ss'],
                dest: '<%= build_dir %>/css/<%= build_name %>.css'
            },
            theme: {
                src: ['<%= src_dir %>/theme/theme.s?(a|c)ss'],
                dest: '<%= build_dir %>/css/theme.css'
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    base: 'build',
                    port: 9009
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            base: {
                files: ['<%= src_dir %>/_*.s?(a|c)ss'],
                tasks: ['sass:base']
            },
            theme: {
                files: ['<%= src_dir %>/theme/*.s?(a|c)ss', '<%= src_dir %>/theme/**/*.s?(a|c)ss'],
                tasks: ['sass:theme']
            }


        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', ['connect', 'watch']);
}

module.exports = function (grunt) {
    grunt.initConfig({
        src_dir: 'src',
        build_dir: 'build',
        build_name: 'bootspice',

        concat: {
            base: {
                options: {
                    stripBanners: 'true',
                    banner: '@import util/functions\n@import util/mixins\n@import bourbon\n\n'
                },
                src: ['<%= src_dir %>/_*.sass'],
                dest: '<%= src_dir %>/<%= build_name %>.sass'
            },
            theme: {
                options: {
                    stripBanners: 'true',
                    banner: '@import ../util/functions\n@import ../util/mixins\n@import bourbon\n@import vars/variables\n\n'
                },
                src: ['<%= src_dir %>/theme/_*.sass'],
                dest: '<%= src_dir %>/theme/theme.sass'
            }
        },
        sass: {
            options: {
                style: 'compressed',
                loadPath: require('node-bourbon').includePaths
            },
            base: {
                src: ['<%= src_dir %>/<%= build_name %>.sass'],
                dest: '<%= build_dir %>/css/<%= build_name %>.css'
            },
            theme: {
                src: ['<%= src_dir %>/theme/theme.sass'],
                dest: '<%= build_dir %>/css/theme.css'
            }
        },

        watch: {
            base: {
                files: ['<%= src_dir %>/_*.sass'],
                tasks: ['concat:base', 'sass:base']
            },
            theme: {
                files: ['<%= src_dir %>/theme/_*.sass', '<%= src_dir %>/theme/**/_*.sass'],
                tasks: ['concat:theme', 'sass:theme']
            }


        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('compile', ['concat', 'sass']);
}

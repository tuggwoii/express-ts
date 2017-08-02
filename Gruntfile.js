module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            build: {
                src: ["src/**/**/**.ts"],
                outDir: 'build',
                options: {
                    rootDir: 'src',
                    sourceMap: false
                }
            }
        },
        watch: {
            files:
            [
                'index.ts'
            ],
            tasks: ['ts']
        },
        shell: {
            run: {
                command: 'node build/index'
            },
            lint: {
                command: 'ng lint'
            }
        },
        copy: {
            assets: {
                files: [
                    { expand: true, src: ['src/static/css/**/*'], dest: 'build/static/css', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/static/js/**/*'], dest: 'build/static/js', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/static/images/**/*'], dest: 'build/static/images', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/static/views/pages/*'], dest: 'build/static/views/pages', filter: 'isFile', flatten: true }
                ]
            }
        },
    });

    //import task runner
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-copy');

    //tasks
    grunt.registerTask('default', ['watch']);     
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('build', ['ts', 'copy']);
    grunt.registerTask('run', ['ts', 'copy', 'shell:run']);
};
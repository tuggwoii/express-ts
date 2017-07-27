module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            server: {
                src: ["src/server/**/**/**.ts"],
                outDir: 'build/server',
                options: {
                    rootDir: 'src/server/',
                    sourceMap: true
                }
            },
            client: {
                src: ["src/client/**/**/**.ts"],
                outDir: 'build/client/',
                options: {
                    rootDir: 'src/client/',
                    sourceMap: true
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
                command: 'node build/server/index'
            },
            /*
            lint: {
                command: 'ng lint'
            }*/
        }
    });

    //import task runner
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-ts");

    //tasks
    grunt.registerTask('default', ['watch']);      
    grunt.registerTask('build', ['ts']);
    grunt.registerTask('run', ['shell:run']);
};
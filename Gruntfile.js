module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            build: {
                src: ["src/**/**/**.ts"],
                outDir: 'build',
                options: {
                    rootDir: 'src',
                    sourceMap: false,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true
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
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            production: {
                NODE_ENV: 'production'
            }
        },
        shell: {
            run: {
                command: 'node build/index'
            },
            lint: {
                command: 'ng lint'
            },
            add_migration: {
                command: 'sequelize migration:create --config src/configs/database-config.json'
            },
            update_database: {
                command: 'sequelize db:migrate --config src/configs/database-config.json'
            },
            undo_migrate: {
                command: 'sequelize db:migrate:undo --config src/configs/database-config.json'
            }
        },
        copy: {
            assets: {
                files: [
                    { expand: true, src: ['src/static/css/**/*'], dest: 'build/static/css', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/static/js/**/*'], dest: 'build/static/js', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/static/images/**/*'], dest: 'build/static/images', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/static/views/pages/*'], dest: 'build/static/views/pages', filter: 'isFile', flatten: true },
                    { expand: true, src: ['src/configs/database-config.json'], dest: 'build/configs/', filter: 'isFile', flatten: true },
                    { expand: true, src: ['migrations/*'], dest: 'build/migrations', filter: 'isFile', flatten: true },
                    { expand: true, src: ['package.json'], dest: 'build/', filter: 'isFile', flatten: true }
                ]
            }
        }
    });

    //import task runner
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-env');
    grunt.registerTask('notify', 'A sample task that logs stuff.', function () {
        grunt.log.writeln('----------------------Build success---------------------');
    });

    //tasks
    grunt.registerTask('default', ['watch']);     
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('build', ['ts', 'copy']);
    grunt.registerTask('run', ['ts', 'copy', 'env:dev', 'shell:update_database', 'notify', 'shell:run']);
    grunt.registerTask('run-production', ['ts', 'copy', 'env:production', 'notify', 'shell:run']);
    grunt.registerTask('add-migration', ['shell:add_migration']);
    grunt.registerTask('update-database', ['shell:update_database']);
    grunt.registerTask('undo-migration', ['shell:undo_migrate']);
};

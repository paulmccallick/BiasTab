
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            teamcity: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'INFO',
                autoWatch: false,
                reporters: ['teamcity']
            },
            commandLine: {
                configFile: 'karma.conf.js',
                singleRun: false,
                browsers: ['PhantomJS','Chrome'],
                logLevel: 'INFO',
                autoWatch: true
            }
        },
        cafemocha: {
            teamcity_mocha: {
                src: ['NodeJSTests/*test*.js'],
                options: {
                    reporter: 'mocha-teamcity-reporter'
                },

            },
            teamcity_qunit: {
                options: {
                    reporter: 'mocha-teamcity-reporter',
                    ui: 'mocha-qunit-ui' 
                },
                src: ['QUnitTests/*Test*.js']
            },
            commandLine_mocha: {
                options: {
                    reporter: 'List'
                },
                src: ['NodeJSTests/*test*.js']
            },
            commandLine_qunit: {
                options: {
                    ui:'mocha-qunit-ui',
                    reporter: 'List',
                },
                src: ['QUnitTests/*Test*.js']
            }
        },
        watch: {
            scripts: {
                files: './BiasTab.Web/Scripts/Bias/*.js',
                tasks: ['browserify:app']
            },
        },
        browserify: {
            vendor: {
                options: {
                    require: ['jquery', 'knockout','pubsub-js']
                },
                src: [],
                dest: './BiasTab.Web/Scripts/vendor.js'
            },
            //this bundle contains the files you need to 
            app: {
                src: ['./BiasTab.Web/Scripts/Bias/*.js'],
                dest: './BiasTab.Web/Scripts/biasapp.js',
                options: {
                    alias: ['./BiasTab.Web/Scripts/Bias/bias_app.js:bias_app'],
                    external: ['jquery', 'knockout','pubsub-js'],
                    bundleOptions: { debug: true }
                }
            }
        },
    });

    //
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-karma');

    // Default task(s).
    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('tctest', ['cafemocha:teamcity_mocha', 'cafemocha:teamcity_qunit']);
    grunt.registerTask('test', ['cafemocha:commandLine_mocha']);

};
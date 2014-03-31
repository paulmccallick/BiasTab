




module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            teamcity: {
                options: {
                    reporter: 'mocha-teamcity-reporter'
                },
                src: ['NodeJSTests/*test*.js']
            },
            commandLine: {
                options: {
                    reporter: 'List'
                },
                src: ['NodeJSTests/*test*.js']
            },

        },
        watch: {
            scripts: {
                files: './BiasTab.Web/Scripts/Bias/*.js',
                tasks: ['browserify']
            },
        },
        browserify: {
            vendor: {
                options: {
                    require: ['jquery', 'knockout'],
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
                    external: ['jquery', 'knockout'],
                    bundleOptions: { debug: true }
                }
            }
        },
    });

    //
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default task(s).
    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('tctest', ['mochaTest:teamcity']);
    grunt.registerTask('test', ['mochaTest:commandLine']);

};
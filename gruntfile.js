




module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: './BiasTab.Web/Scripts/Bias/*.js',
                tasks: ['browserify'],
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
            app: {
                src: ['./BiasTab.Web/Scripts/Bias/*.js'],
                dest: './BiasTab.Web/Scripts/biasapp.js',
                options: {
                    alias: ['./BiasTab.Web/Scripts/Bias/bias_app.js:bias_app'],
                    external: ['jquery','knockout']
                }
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['browserify']);

};
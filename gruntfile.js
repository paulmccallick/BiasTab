




module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: './BiasTab.Web/Scripts/Bias/bias_view_model.js',
                tasks: ['browserify'],
            },
        },
        browserify: {
            js: {
                src: ['./BiasTab.Web/Scripts/Bias/bias_view_model.js'],
                dest: './BiasTab.Web/Scripts/bundle.js',
                options: {
                    alias: ['./BiasTab.Web/Scripts/Bias/bias_view_model.js:bias_view_model'],
                    external: ['jquery']
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
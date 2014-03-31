var grunt = require("grunt");
var config = require(__dirname + '/gruntfile.js');
config(grunt);
grunt.tasks(['mochaTest']);
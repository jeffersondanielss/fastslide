module.exports = function( grunt ) {

  "use strict";

  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'src/fastslide.min.js': ['src/fastslide.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
}
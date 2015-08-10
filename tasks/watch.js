'use strict';

module.exports = function watch(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Options
  return {
    js: {
      files: [
        'public/**/*.js',
        'public/**/*.jsx',
        '!public/**/*.min.js'
      ],
      tasks: [
        'browserify'
      ]
    },
    styles: {
      files: [
        'public/**/*.less'
      ],
      tasks: [
        'less'
      ]
    }
  };
};

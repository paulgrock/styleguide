'use strict';

module.exports = function less(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-contrib-less');

  // Options
  return {
    build: {
      options: {
        sourceMap: true
      },
      files: {
        'public/css/app.min.css': ['public/css/**/*.less']
      }
    }
  };
};

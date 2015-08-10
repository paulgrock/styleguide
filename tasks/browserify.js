'use strict';
const babelify = require('babelify');
const globify = require('require-globify');

module.exports = function browserify(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-browserify');

  // Options
  return {
    build: {
      files: {
        'public/js/app.min.js': ['public/js/app.js']
      },
      options: {
        transform: [babelify, globify]
      }
    }
  };
};

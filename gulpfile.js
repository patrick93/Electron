var gulp = require('gulp');
var shell = require('gulp-shell');
var gutil = require('gulp-util');

gulp.task('default', shell.task(['./node_modules/.bin/electron main.js']));

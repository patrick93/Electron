var gulp = require('gulp');
var shell = require('gulp-shell');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');

var electron = require('electron-connect').server.create();
var tsProject = ts.createProject('tsconfig.json');

gulp.task('tscompile', function(){
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest(""));
});

gulp.task('electron-reload', function(){
    electron.reload();
});

gulp.task('default', ['watch']);

gulp.task('watch', function(){
    electron.start();
    gulp.watch('app.js', electron.restart);
    gulp.watch('Electron.App/**/*.ts', function(){runSequence('tscompile', 'electron-reload');});
});

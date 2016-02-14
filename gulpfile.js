var gulp = require('gulp');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

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
    spawn('./node_modules/.bin/json-server', ['--watch', 'db.json']);
    electron.start();
    gulp.watch('app.js', electron.restart);
    gulp.watch('Electron.App/**/*.ts', function(){runSequence('tscompile', 'electron-reload');});
});

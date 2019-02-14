'use strict';

const gulp          = require('gulp');
const uglify        = require('gulp-uglify');
const concat        = require('gulp-concat');
const jshint        = require('gulp-jshint');
const babel         = require('gulp-babel');
const cssnano       = require('gulp-cssnano');
const connect       = require('gulp-connect');
/*const csso          = require('gulp-csso');*/
const browserSync   = require('browser-sync').create();
const watch         = require('gulp-watch');
const less          = require('gulp-less');
const livereload    = require('gulp-livereload');
const path          = require('path');

gulp.task('lint', () => {
    return gulp.src(['site/assets/jsMine/*.js', 'site/assets/jsNotMine/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('uglify', () => {
    return gulp.src(['site/assets/jsMine/*.js', 'site/assets/jsNotMine/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('concat', () => {
    return gulp.src('build/*.js')
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('cssnano', () => {
    return gulp.src('site/assets/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('css-concat', () => {
    return gulp.src('build/*.css')
        .pipe(concat('dist.css'))
        .pipe(gulp.dest('dist'))
});

gulp.task('less', () => {
    return gulp.src('site/assets/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('build'))
});

/*gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
    browserSync.watch('build', browserSync.reload)
});

gulp.task('reload-css', () => {
    gulp.src('site/assets/css/!*.css', gulp.parallel('reload-css'))
        .pipe(livereload())
});*/

gulp.task('watch', () => {
    gulp.watch('site/assets/jsMine/*.js', gulp.parallel('uglify'));
    gulp.watch('site/assets/css/*.css', gulp.parallel('cssnano'));
    gulp.watch('build/*.css', gulp.parallel('css-concat'));
    gulp.watch('build/*.js', gulp.parallel('concat'));
});
gulp.task('forWatch', gulp.series('uglify', 'cssnano', 'css-concat', 'concat'));

/*gulp.task('default', gulp.series(
    gulp.parallel('watch', 'server')
));*/


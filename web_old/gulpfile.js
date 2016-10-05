/**
 * Created by 3fuyu on 16/03/10.
 */

(function () {
    "use strict";

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        zip = require('gulp-zip'),
        clean = require('gulp-clean');
        // htmlmin = require('gulp-htmlmin'),
        // minify = require('gulp-minify-css');

    var releaseVersion = '1-0-0';

    var date = new Date();
    var result = date.getFullYear() + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    var debugVersion = releaseVersion.split('-')[0] + '-' + releaseVersion.split('-')[1] + '-' + result;

    var realm = 'quality';

    gulp.task('default-release', ['build-release-dist', 'clean-src'], function () {
        //default
    });

    gulp.task('build-release-dist', ['build-release-directory'], function () {
        return gulp.src([
                'dist/**'
            ])
            .pipe(zip(realm + '-' + releaseVersion + '.zip'))
            .pipe(gulp.dest('dist'));

    });

    gulp.task('build-release-directory', ['build-release-directory-index'], function () {
        return gulp.src([
                'assets/*/*'
            ])
            .pipe(gulp.dest('dist/quality/assets'));
    });

    gulp.task('build-release-directory-index',['clean-dist'], function () {
        return gulp.src([
                'index.html'
            ])
            .pipe(gulp.dest('dist/quality'));
    });

    gulp.task('build-debug-dist', function () {
        return gulp.src([
                'assets/*/*'
            ])
            .pipe(zip(realm + '-' + debugVersion + '.zip'))
            .pipe(gulp.dest('dist'));

    });

    gulp.task('clean-src', function () {
        return gulp.src([
                'dist/quality'
            ])
            .pipe(clean());
    });

    gulp.task('clean-dist', function () {
        return gulp.src([
                'dist'
            ])
            .pipe(clean());
    });

    gulp.task('html-min', function () {
        return gulp.src([
                'conf.index.html'
            ])
            .pipe(
                htmlmin({collapseWhitespace: true})
            )
            .pipe(gulp.dest('dist'));
    });

    gulp.task('css-min', function () {
        return gulp.src([
                'dist/conf.index.html'
            ])
            .pipe(minify())
            .pipe(gulp.dest('dist'));
    });
})();
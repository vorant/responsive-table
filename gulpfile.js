'use strict';

var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    minifyCss  = require('gulp-minify-css'),
    browserify = require('browserify')
;

gulp.task('js', function() {
    return browserify('./lib/browser.js')
        .bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
        ;
});

gulp.task('css', function() {
    return gulp.src('lib/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('min', ['css', 'js']);
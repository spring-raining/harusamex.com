'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('default', ['clean'], (callback) =>
  runSequence(
    ['html', 'scripts', 'styles', 'copy'],
    callback
  )
);

gulp.task('clean', () => del([], {dot: true}));

gulp.task('html', () =>
  gulp.src('app/**/*.jade')
    .pipe($.jade({
      pretty: true,
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('scripts', () =>
  gulp.src('app/scripts/**/*.js')
    .pipe($.browserify({
      transform: ['babelify'],
    }))
    .pipe($.uglify({
      preserveComment: 'some',
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
);

gulp.task('styles', () =>
  gulp.src([
    'app/styles/**/*.styl',
    '!app/styles/**/_*.styl',
  ]).pipe($.stylus())
    .pipe(gulp.dest('dist/styles'))
);

gulp.task('copy', () =>
  gulp.src([
    'app/*',
    'app/images/**/*',
    '!app/*.jade',
    '!app/*.html',
  ], {
    dot: true,
  }).pipe(gulp.dest('dist'))
);


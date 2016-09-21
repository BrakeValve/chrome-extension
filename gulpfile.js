/* eslint-disable */

const gulp = require('gulp'),
      glob = require('glob'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      watchify = require('watchify'),
      buffer = require('vinyl-buffer'),
      source = require('vinyl-source-stream'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename');


const bundledScriptFilename = 'main.js';
const destinationDirectory = 'dist'


const transpile = () => {
  const entries = glob.sync('src/scripts/*.es');

  return browserify({ entries: entries })
          .transform(babelify)
          .bundle()
          .on('error', (err) => console.error(err))
          .pipe(source(bundledScriptFilename))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(destinationDirectory))
};

const minify = () => {
  return gulp.src(`${destinationDirectory}/${bundledScriptFilename}`)
          .pipe(uglify())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(destinationDirectory))
};


gulp.task('transpile', () => transpile());
gulp.task('minify', ['transpile'], () => minify());

gulp.task('default', ['transpile', 'minify']);
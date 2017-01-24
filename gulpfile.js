const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const siteRoot = '_site';
const cssFiles = 'assets/css/.?(s)css';
const jsFiles = [
                 'assets/js/jquery.min.js',
                 'assets/js/bootstrap.min.js',
                 'assets/js/flexslider.min.js',
                 'assets/js/lightbox.min.js',
                 'assets/js/masonry.min.js',
                 'assets/js/ytplayer.min.js',
                 'assets/js/smooth-scroll.min.js',
                 'assets/js/parallax.js',
                 'assets/js/scripts.js'
                ];

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets'));
});

gulp.task('js', () => {
  gulp.src(jsFiles)
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/'));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, jsFiles, ['css', 'js']);
});

gulp.task('default', ['css', 'js', 'jekyll', 'serve']);

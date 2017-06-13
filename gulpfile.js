const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

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

gulp.task('js', () => {
  gulp.src(jsFiles)
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js/'));
});

gulp.task('serve', () => {
  gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['js', 'serve']);

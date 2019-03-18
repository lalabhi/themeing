var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

const minify = require('gulp-minify');



gulp.task('sass', function(){
  return gulp.src('scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('reload',function (done) {
  browserSync.reload();
  done();
});

gulp.task('browserSync', function() {

  browserSync.init({
    open: 'external',
    host: 'localhost',
    proxy: 'http://localhost/drupal-dev/web/'
  });
  gulp.watch('scss/*.scss', gulp.series('sass'));

});

gulp.task('watch', function(){
  gulp.watch('scss/*.scss', gulp.series('sass', 'reload', gulp.parallel('browserSync')));
  // Other watchers
});

gulp.task('imagemin', function(done) {
  var imgSrc = 'src/images/*.+(png|jpg|gif)',
    imgDst = 'src/buildimage';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
  done()
});

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(minify({
      ext:{
        src:'-debug.js',
        min:'.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});

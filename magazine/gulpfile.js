var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  var files = [
    'drupal-dev/web/*'
  ];
  browserSync.init(files,{
    open: 'external',
    host: 'localhost',
    proxy: 'http://localhost/drupal-dev/web/',
    port: 80
  });
});

gulp.task('watch', gulp.series('browserSync','sass', function(){
  gulp.watch('scss/*.scss', gulp.series('sass'));
  // Other watchers
}));

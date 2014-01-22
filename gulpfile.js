var gulp  = require('gulp');
var gutil = require('gulp-util');
var sass  = require('gulp-sass');

gulp.task('sass', function() {
   gulp.src('css/sass/style.scss')
      .pipe(sass({
         includePaths: ['css/sass'],
         outputStyle: 'compressed'
      }))
      .pipe(gulp.dest('css'));
});


gulp.task('default', function() {
   gulp.run('sass');
   gulp.watch(['css/sass/**/*.scss'], function() {
      gulp.run('sass');
   });
});
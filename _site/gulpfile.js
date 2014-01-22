var gulp  = require('gulp');
var gutil = require('gulp-util');
var sass  = require('gulp-sass');
var exec  = require('gulp-exec');
// var watch = require('gulp-watch');

gulp.task('sass', function() {
   gulp.src('css/sass/style.scss')
      .pipe(sass({
         includePaths: ['css/sass'],
         outputStyle: 'compressed'
      }))
      .pipe(gulp.dest('css'));
});

gulp.task('jekyllbuild', function() {
   return gulp.src('./**/*.html')
      .pipe(exec('jekyll build'));
});

gulp.task('default', function() {
   gulp.run('sass');
   gulp.watch(['css/sass/**/*.scss'], function() {
      gulp.run('sass');
   });
});
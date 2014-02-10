var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    jekyll  = require('gulp-jekyll'),
    refresh = require('gulp-livereload'),
    lr      = require('tiny-lr'),
    server  = lr();

var paths = {
   sass: 'css/sass/**/*.scss',
   markupSrc:  [
      '*.html',
      '_layouts/**',
      '_posts/**',
      '_includes/**'
   ],
   markupDir: './',
   markupDest: '_site'
};

gulp.task('livereload', function() {
   server.listen(35729, function(err) {
      if (err) return console.log(err);
   });
});

gulp.task('sass', function() {
   return gulp.src('css/sass/style.scss')
      .pipe(sass({
         includePaths: ['css/sass'],
         outputStyle: 'compressed'
      }))
      .pipe(gulp.dest('css'))
      .pipe(refresh(server));
});

gulp.task('jekyll', function() {
   return gulp.src(paths.markupDir)
      .pipe(jekyll({
         source: './',
         destination: paths.markupDest,
      }))
      .pipe(gulp.dest('./_site/'))
      .pipe(refresh(server));
});

gulp.task('watch', function() {
   gulp.watch(paths.sass, ['sass']);
   gulp.watch(paths.markupSrc, ['jekyll']);
});

gulp.task('default', ['sass', 'jekyll', 'livereload', 'watch']);

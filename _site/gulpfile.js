var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    prefix     = require('gulp-autoprefixer'),
    jekyll     = require('gulp-jekyll'),
    imagemin   = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    lr         = require('tiny-lr'),
    server     = lr();

var paths = {
   markupSrc:  [
      '*.html',
      '_layouts/**/*.html',
      '_posts/**/*.{html,md}',
      '_includes/**/*.html'
   ],
   markupDir: './**/*.{html,md}',
   markupDest: '_site'
};


var site = {
  src:      '*.html',
  layouts:  '_layouts/*',
  includes: '_includes/*',
  posts:    '_posts/*',
  build:    '_site'
};

var dest = {
  css:   site.build + '/css',
  img:   site.build + '/img',
  js:    site.build + '/js'
};

var css = {
  src:     'css/sass/style.scss',
  imports: 'css/sass/**',
  dest:    'css'
};

gulp.task('livereload', function() {
   server.listen(35729, function(err) {
      if (err) return console.log(err);
   });
});

gulp.task('sass', function() {
   return gulp.src(css.src)
      .pipe(sass({
         includePaths: [css.imports],
         outputStyle:  'expanded',
         lineNumbers:  true
      }))
      .pipe(gulp.dest(css.dest))
      .pipe(livereload(server));
});

gulp.task('jekyll', function() {
   return gulp.src(paths.markupSrc)
      .pipe(jekyll({
         source: './',
         destination: paths.markupDest
      }))
      .pipe(gulp.dest('./_site'))
      .pipe(refresh(server));
});

gulp.task('watch', function() {
   gulp.watch(css.src, ['sass']);
   gulp.watch(paths.markupSrc, ['jekyll']);
});

gulp.task('default', ['sass', 'livereload', 'watch']);

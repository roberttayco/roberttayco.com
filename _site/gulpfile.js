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
      '_layouts/**',
      '_posts/**',
      '_includes/**'
   ],
   markupDir: './',
   markupDest: '_site'
};


var jekyll = {
  src:      '*.html',
  layouts:  '_layouts/*',
  includes: '_includes/*',
  posts:    '_posts/*',
  build:    '_site'
};

var dest = {
  css:   jekyll.build + '/css',
  img:   jekyll.build + '/img',
  js:    jekyll.build + '/js'
};

var sass = {
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
   return gulp.src(sass.src)
      .pipe(sass({
         includePaths: [sass.imports],
         outputStyle:  'expanded',
         lineNumbers:  true
      }))
      .pipe(gulp.dest(sass.dest))
      .pipe(livereload(server));
});

// gulp.task('jekyll', function() {
//    return gulp.src(paths.markupDir)
//       .pipe(jekyll({
//          source: './',
//          destination: paths.markupDest,
//       }))
//       .pipe(gulp.dest('./_site/'))
//       .pipe(refresh(server));
// });

gulp.task('watch', function() {
   gulp.watch(paths.sass, ['sass']);
   gulp.watch(paths.markupSrc, ['jekyll']);
});

gulp.task('default', ['sass', 'livereload', 'watch']);

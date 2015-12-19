var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    prefix     = require('gulp-autoprefixer'),
    jekyll     = require('gulp-jekyll-stream'),
    imagemin   = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    lr         = require('tiny-lr'),
    server     = lr();

// Project paths
var paths = {
   workingDir: '/',
   drafts:     '_drafts',
   layouts:    '_layouts',
   includes:   '_includes',
   posts:      '_posts',
   data:       '_data'
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

// Jekyll compilation
gulp.task('jekyll', function() {
   return gulp.src(paths.workingDir)
      .pipe(jekyll({
         bundleExec: false,
         quiet:      true,
         safe:       false,
         cwd:        paths.workingDir,
         layouts:    paths.layouts,
      }))
      .pipe(gulp.dest('./_site'))
      .pipe(refresh(server));
});

// Watch CSS files to compile Sass, and watch markup to compile Jekyll templates
gulp.task('watch', function() {
   gulp.watch(css.src, ['sass']);
   gulp.watch(paths.markupSrc, ['jekyll']);
});

gulp.task('default', ['sass', 'livereload', 'watch']);

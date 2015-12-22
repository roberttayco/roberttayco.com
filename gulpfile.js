var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jekyll       = require('gulp-jekyll-stream'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload');
   //  lr           = require('tiny-lr'),
   //  server       = lr();

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
  path: 'css/sass/**',
  dest:    'css'
};

gulp.task('livereload', function() {
   server.listen(35729, function(err) {
      if (err) return console.log(err);
   });
});

gulp.task('styles', function() {
   return gulp.src(css.src)
      .pipe(sass({
         includePaths: [css.path],
         outputStyle:  'expanded',
         lineNumbers:  true
      }))
      .pipe(autoprefixer({
         browsers: ['last 2 version','android >= 4']
      }))
      .pipe(gulp.dest(css.dest));
      // .pipe(livereload(server));
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
      .pipe(gulp.dest(site.build))
      .pipe(refresh(server));
});

// Watch CSS files to compile Sass, and watch markup to compile Jekyll templates
gulp.task('watch', function() {
   gulp.watch(css.path, ['styles']);
   gulp.watch(paths.markupSrc, ['jekyll']);
});

// gulp.task('default', ['styles', 'livereload', 'watch']);
gulp.task('default', ['styles', 'watch']);

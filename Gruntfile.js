module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.JSON'),

      cssOutput:    './css/style.css',
      cssOutputMin: './css/style.min.css',
      sassOutput:   './css/sass/style.scss',
      sassPath:     './css/sass/**/*.scss',
      jekyllPath: [
         './*.html',
         './_includes/*.html',
         './_layouts/*.html',
         './_posts/*.html'
         ],

      sass: {
         dist: {
            files: {
               '<%= cssOutputMin %>':'<%= sassOutput %>'
            },
            options: {
               outputStyle: 'compressed'
            }
         },
         dev: {
            files: {
               '<%= cssOutput %>':'<%= sassOutput %>'
            },
            options: {
               includePaths: ['<%= sassPath %>'],
               outputStyle: 'expanded',
               sourceComments: 'normal'
            }
         }
      },

      jekyll: {
         dist: {
            options: {}
         }
      },

      watch: {
         html: {
            files: ['<%= jekyllPath %>'],
            tasks: ['jekyll:dist'],
            options: {
               livereload: true
            }
         },
         css: {
            files: ['<%= sassPath %>'],
            tasks: ['sass:dev'],
            options: {
               livereload: true,
               spawn: false
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-jekyll');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('default', ['sass:dev']);
   grunt.registerTask('release', ['sass:dist']);
};
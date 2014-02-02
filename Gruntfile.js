module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.JSON'),

      cssOutput:    'css/style.css',
      cssOutputMin: 'css/style.min.css',
      sassOutput:   'css/sass/style.scss',
      sassPath:     'css/sass/**/*.scss',
      jekyllPath: [
         '*.html',
         '_includes/**',
         '_layouts/**',
         '_posts/**'
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

      shell: {
         jekyllBuild: {
            command: 'jekyll build'
         }
      },

      watch: {
         options: {
            livereload: true,
            interrupt: true,
            atBegin: true
         },

         html: {
            files: ['<%= jekyllPath %>', '!node_modules'],
            tasks: ['shell:jekyllBuild']
         },

         css: {
            files: ['<%= sassPath %>'],
            tasks: ['sass:dev','shell:jekyllBuild'],
            options: {
               spawn: false
            }
         },
      }
   });

   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-jekyll');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-shell');

   grunt.registerTask('default', ['sass:dev']);
   grunt.registerTask('release', ['sass:dist']);
};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngtemplates: {
      main:{
        options: {
          module: 'empdb',
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        },
        cwd: 'resources/templates',
        src: '**/*.html',
        dest: 'public/js/templates.js',
      }
    },
    watch: {
      templates: {
        files: ['resources/templates/**/*.html'],
        tasks: ['ngtemplates'],
      },
    },
    concat: {
      main: {
        options: {
          sourceMap: true
        },
        files: {
          'public/css/vendor.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css'
          ],
          'public/js/vendor.js': [
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          ],
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            cwd:'bower_components/bootstrap/dist/fonts',
            src: '*',
            dest: 'public/fonts/',
            expand: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['ngtemplates','concat','copy']);
  grunt.registerTask('templates', ['ngtemplates']);
}

module.exports = function(grunt) {
  var port = grunt.option('port') || 3000;
	var base = grunt.option('base') || '.';
  grunt.initConfig({
    includes: {
      files:{
        src: ['main.js'],
        dest: 'public/build/',
        cwd: 'public/src/js'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/build/playground.css": "public/src/less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      clientscript: {
        files: ['public/src/less/**/*.less','public/src/js/**/*.js'], // which files to watch
        tasks: ['includes', 'babel', 'less'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      serverscript:{
        files: ['server/**/*.js'], // which files to watch
        tasks: ['includes', 'babel', 'express'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      views: {
        files: ['public/views/**/*.html'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },
    express: {
			prod: {
				options: {
					script: "server.js"
				}
			}
		},
    babel: {
  		options: {
  			sourceMap: false,
  			presets: ['babel-preset-es2015']
  		},
  		dist: {
  			files: {
  				'public/build/playground.js': 'public/build/main.js'
  			}
  		}
  	},
    uglify:{
      options : {
        beautify : false,
        mangle   : true
      },
      build: {
        files: {
          'public/build/playground.min.js': ['public/build/playground.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.registerTask('default', ['less', 'includes', 'babel', 'uglify', 'express', 'watch' ] );
};

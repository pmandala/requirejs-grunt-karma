'use strict';

module.exports = function(grunt) {

	// Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app : 'src',
        test : 'test',
        dist : 'dist',
        modules : grunt.file.readJSON('modules.json')
    };
	
    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman : appConfig,

        // Watches files for changes and runs tasks based on the changed
        // files
        watch : {

            js : {
                files : [ '<%= yeoman.app %>/js/**/*.js',
                          '<%= yeoman.app %>/js/*.js' ],
                tasks : [ 'newer:jshint:all' ],
                options : {
                    livereload : '<%= connect.options.livereload %>'
                }
            },
            jsTest : {
                files : [ 'test/spec/{,*/}*.js' ],
                tasks : [ 'newer:jshint:test', 'karma' ]
            },
            styles : {
                files : [ '<%= yeoman.app %>/css/**/*.scss' ],
                tasks : [ 'sass', 'newer:copy:styles' ]
            },
            gruntfile : {
                files : [ 'Gruntfile.js' ]
            },
            livereload : {
                options : {
                    livereload : '<%= connect.options.livereload %>'
                },
                files : [ '<%= yeoman.app %>/js/**/*.html',
                        '<%= yeoman.app %>/*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/css/**/*.{png,jpg,jpeg,gif}' ]
            }

        },

        // The actual grunt server settings
        connect : {
            options : {
                port : 1080,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname : 'localhost',
                livereload : 35729
            },
            proxies : [{
                context: ['/api', '/userinfo'],
                host: 'localhost',
                port: 1080,
                https: false,
                rewrite: {
                    '/userinfo': '/userinfo'
                }
            }],
            livereload : {
                options : {
                    open : false,
                    middleware : function(connect) {
                        return [ require('grunt-connect-proxy/lib/utils').proxyRequest,
                                 connect.static('.tmp'),
                                 connect.static(appConfig.app) ];
                    }
                }
            },
            test : {
                options : {
                    port : 9001,
                    middleware : function(connect) {
                        return [ connect.static('.tmp'),
                                connect.static('test'),
                                connect.static(appConfig.app) ];
                    }
                }
            },
            dist : {
                options : {
                    open : true,
                    base : '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious
        // mistakes
        jshint : {
            options : {
                jshintrc : '.jshintrc',
                reporter : require('jshint-stylish')
            },
            all : {
                src : [ 'Gruntfile.js', 
                        '<%= yeoman.app %>/js/*.js',
                        '<%= yeoman.app %>/js/resources/**/*.js',
                        '<%= yeoman.app %>/js/app/**/*.js']
            },
            test : {
                options : {
                    jshintrc : 'test/.jshintrc'
                },
                src : [ 'test/spec/**/*.js' ]
            }
        },

        uglify : {
            dest : {
                options : {
                    mangle : {
                        'screw_ie8' : true
                    },
                    preserveComments : 'some',
                    compress : {
                        'screw_ie8' : true,
                        sequences : true,
                        'dead_code' : true,
                        conditionals : true,
                        booleans : true,
                        unused : true,
                        'if_return' : true,
                        'join_vars' : true,
                        'drop_console' : false
                    }
                },
                files : [ {
                    expand : true,
                    cwd : '<%= yeoman.dist %>/js',
                    src : '*.js',
                    dest : '<%= yeoman.dist %>/js'
                }, {
                    expand : true,
                    cwd : '<%= yeoman.dist %>/js/app',
                    src : '**/*.js',
                    dest : '<%= yeoman.dist %>/js/app'
                } ]
            }
        },

        cssmin : {
            dist : {
                files : {
                    '<%= yeoman.dist %>/css/main.css' : [ '<%= yeoman.dist %>/css/main.css' ]
                }
            }
        },

        htmlmin : {
            dist : {
                options : {
                    collapseWhitespace : true,
                    conservativeCollapse : true,
                    collapseBooleanAttributes : true,
                    removeCommentsFromCDATA : true,
                    removeOptionalTags : true
                },
                files : [ {
                    expand : true,
                    cwd : '<%= yeoman.dist %>',
                    src : [ '*.html', 'js/app/**/*.html' ],
                    dest : '<%= yeoman.dist %>'
                } ]
            }
        },

        sass : {
            dist : {
                files : [ {
                    expand : true,
                    cwd : '<%= yeoman.app %>/css/scss',
                    src : [ '*.scss' ],
                    dest : '<%= yeoman.app %>/css/scss/scss-out',
                    ext : '.css'
                } ]
            }
        },

        copy : {
            dist : {
                files : [ {
                        expand : true,
                        dot : true,
                        cwd : '<%= yeoman.app %>',
                        dest : '<%= yeoman.dist %>',
                        src : [ '*.{ico,txt}', 
                                '*.html', 
                                'js/**/*',
                                'css/**/*', 
                                '!css/**/*.map', 
                                'WEB-INF/*' ]
                }]
            },
            styles : {
                files : [ {
                        expand : true,
                        cwd : '<%= yeoman.app %>/css/scss/scss-out',
                        dest : '<%= yeoman.app %>/css',
                        src : ['main.css']
                    } ,{ 
                        expand : true,
                        cwd : '<%= yeoman.app %>',
                        dest : '.tmp/styles/',
                        src : 'css/**/*.*'
                    }]
            }
        },

        clean : {
            dist : {
                files : [ {
                    dot : true,
                    src : [ '.tmp', 
                            '<%= yeoman.dist %>/{,*/}*' ]
                } ]
            },
            server : '.tmp'
        },
        
        useminPrepare: {
		  options: {
			dest: '<%= yeoman.dist %>'
		  },
		  html: '<%= yeoman.dist %>/index.html'
		},
		usemin: {
		  options: {
			 assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/css']
		  },
		  html: ['<%= yeoman.dist %>/index.html']
		},
        
        requirejs: {
            compile: {
              options: {
                logLevel: 0,
                baseUrl: '<%= yeoman.app %>/js/',
                mainConfigFile: '<%= yeoman.app %>/js/main.js',
                //name: 'main',
                dir: '<%= yeoman.dist %>/js/',
                //exclude: [],
                //out: './dist/js/main.js',
                //generateSourceMaps: true,
                preserveLicenseComments: false,
                optimize: 'none',
                //fileExclusionRegExp: /^\./,
                modules : appConfig.modules.requireJS
              }
            }
        },
        
		filerev: {
			options: {
				process: function(basename, key, extension) {
					var newName = '';
					if(basename.indexOf('.tmpl') !== -1){
						var ext = basename.substr(basename.indexOf('.tmpl'));
						var file = basename.substr(0, basename.indexOf('.tmpl'));
						newName =  file +'.'+ key + ext +'.'+ extension;
					}else{
						newName =  basename +'.'+ key +'.'+ extension;
					}
					grunt.log.writeln(basename +'.'+ extension +' changed to '+ newName);
					return newName;
				}
			},
			dist: {
				expand : true,
				cwd : '<%= yeoman.dist %>',
				dest : '<%= yeoman.dist %>',
				src: appConfig.modules.filerevs
			}
		},
		
		'regex-replace': {
		  rjsmodules: { 
				src: [],
				actions:[]
		  }
		},
		
		size_report: {
			default: {
				files: {
					list: []
				},
			},
		},

		
		// Test settings
        karma: {
            unit: {
              configFile: 'test/karma.conf.js',
              singleRun: true
            }
        }

    });
    
    grunt.registerTask('writerev', 'Writes the summary output of filerev.js', function() {
		var prefix = 'app/';
		var postfix = '.js';		
		var output = {};
		var regex_src = [];
		var regex_actions = [];
		for (var key in grunt.filerev.summary) {
		  if (grunt.filerev.summary.hasOwnProperty(key)) {
		  	//remove path 'dist/' from key and value
		  	var prop = key.substring(5);
		  	var val = grunt.filerev.summary[key].substring(5);
		  	var revPath = grunt.filerev.summary[key];
			output[prop] = val;
			
			if((/\.(js)$/i).test(prop)){
				if(prop.indexOf('main.') !== -1){
                    regex_src.push(revPath);
					continue;
				}
				var source = prop.substr(prop.indexOf(prefix));
				source = '\''+ source.substr(0, source.indexOf(postfix)) +'\'';
				var target = val.substr(val.indexOf(prefix));
				target = '\''+ target.substr(0, target.indexOf(postfix)) +'\'';
				//grunt.log.writeln('%s replace %s @ %s', source, target, revPath);
				regex_src.push(revPath);
				regex_actions.push({'search': source, 'replace': target, flags: 'g'});
			}
		  }
		}
		//grunt.log.writeln(JSON.stringify(output, null, 2));
		grunt.config.set('size_report.default.files.list', regex_src);
		grunt.config.set('regex-replace.rjsmodules.src', regex_src);
		grunt.config.set('regex-replace.rjsmodules.actions', regex_actions);
		//grunt.log.writeln('%j', grunt.config('regex-replace.rjsmodules'));
		grunt.task.run('regex-replace:rjsmodules');
		grunt.task.run('uglify');
		grunt.task.run('size_report');
			
		grunt.file.write('dist/js/filerev.js', 'define(function() { return ' + JSON.stringify(output, null, 2) + '; });');
	});
	
	grunt.registerTask('genrev', [ 'filerev', 'writerev' ]);

    grunt.registerTask('serve', 'Compile then start a connect web server',
        function(target) {
            if (target === 'dist') {
                return grunt.task.run([ 'build', 'connect:dist:keepalive' ]);
            }

            grunt.task.run([ 'clean:server', 
                             'copy:styles',
                             'configureProxies:server',
                             'connect:livereload', 
                             'watch' ]);
        });

    grunt.registerTask('test', [ 'karma' ]);
    
    grunt.registerTask('run-sass', [ 'sass', 'newer:copy:styles' ]);
    
    grunt.registerTask('build', [ 'clean:dist', 
                                  'copy:dist',
                                  'useminPrepare',
                                  //'uglify', 
                                  'cssmin',  
                                  'requirejs',
                                  'genrev',
                                  'usemin',
                                  'htmlmin',
                                  'test' ]);
    
    grunt.registerTask('default', [ 'newer:jshint', 'build']); 

};

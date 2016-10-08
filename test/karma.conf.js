// Karma configuration
// Generated on Fri Feb 19 2016 20:48:00 GMT-0800 (PST)

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

//debug
//karma start test/karma.conf.js --single-run=false --debug

module.exports = function(config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files,
        // exclude)
        basePath : '../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks : [ 'mocha', 'requirejs' ],

        // list of files / patterns to load in the browser
        files : [

        {
            pattern : "src/js/**/*.js",
            included : false
        }, {
            pattern : "src/js/**/*.tmpl.html",
            included : false
        }, {
            pattern : "node_modules/chai/chai.js",
            included : false
        }, {
            pattern : "node_modules/sinon/pkg/**/*.js",
            included : false
        }, {
            pattern : 'test/spec/**/*.js',
            included : false
        }, {
            pattern : 'test/karma-test-css-main.js',
            included : false
        }, {
            pattern : 'src/css/**/alta/oj-alta-min.css',
            included : false
        },{
            pattern : 'src/css/**/main.css',
            included : false
        },

        'test/karma-test-main.js'

        ],

        // list of files to exclude
        exclude : [ 'src/js/main.js', 
                    'src/js/libs/require/require-debug.js',
                    'src/js/libs/require/require.js' ],


        // preprocess matching files before serving them to the browser
        // available preprocessors:
        // https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors : {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['progress', 'mp3', 'html'],
        reporters : [ 'progress', 'html' ],

        // web server port
        port : 9876,

        // enable / disable colors in the output (reporters and logs)
        colors : true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel : config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file
        // changes
        autoWatch : true,

        // start these browsers
        // available browser launchers:
        // https://npmjs.org/browse/keyword/karma-launcher
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers : [ 'PhantomJS' ],

        // Which plugins to enable
        plugins : [ 'karma-requirejs', 
                    'karma-phantomjs-launcher',
                    'karma-mocha', 
                    'karma-htmlfile-reporter', 
                    'karma-coverage' ],

        htmlReporter : {
            outputFile : './target/unit-test-report.html',

            pageTitle : 'Unit Tests',
            subPageTitle : 'Spoccs'
        },

        coverageReporter : {
            type : 'html',
            dir : './target/reports/spoccs-web-coverage',
            subdir : '.'
        },

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout : 60000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun : false
    })
}

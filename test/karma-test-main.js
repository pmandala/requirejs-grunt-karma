'use strict';
(function(window) {

    var allTestFiles = [];
    var TEST_REGEXP = /spec\.js$/i;

    Object.keys(window.__karma__.files).forEach(function(file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
            allTestFiles.push(normalizedTestModule);
        }
    });

    console.log('\n' + allTestFiles.join('\n'));

    requirejs
        .config({

            baseUrl: '/base',

            paths: {
                'jquery': 'src/js/libs/jquery/jquery-2.1.3.min',
                'text': 'src/js/libs/require/text',
                'test_css': 'test/karma-test-css-main',
                'app': 'src/js/app',

                'chai': 'node_modules/chai/chai',
                'sinon': 'node_modules/sinon/pkg/sinon'
            },

            // Shim configurations for modules that do not expose AMD
            shim: {
                'jquery': {
                    exports: ['jQuery', '$']
                }
            },

            config: {
                /*
                 * i18n: { locale: 'fr-fr' },
                 */

            },
            // ask Require.js to load these files (all our tests)
            deps: ['test_css'].concat(allTestFiles),

            // start test run, once Require.js is done
            callback: window.__karma__.start

        });

})(window);

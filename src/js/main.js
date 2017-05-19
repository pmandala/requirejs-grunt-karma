'use strict';

requirejs.config({
    // Path mappings for the logical module names
    paths: {
        'jquery': 'libs/jquery/jquery-2.1.3.min',

        'text': 'libs/require/text',

        //app specific libraries
        'crossroads': 'app/libs/crossroads/crossroads.min',
        'hasher': 'app/libs/crossroads/hasher.min',
    },

    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'crossroads': {
            deps: ['signals'],
            exports: 'crossroads'
        }
    },

    config: {
        /*i18n: {
         locale: 'fr-fr'
         },*/

    }
});

require([],
    function($) {

    });

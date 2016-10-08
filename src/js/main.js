'use strict';

requirejs.config({
    // Path mappings for the logical module names
    paths: {
        'knockout': 'libs/knockout/knockout-3.4.0',
        'komapping': 'libs/knockout/knockout.mapping-latest',
        'jquery': 'libs/jquery/jquery-2.1.3.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
        'jquery.ui.widget': 'libs/jquery/jqueryui-amd-1.11.4/widget',
        'promise': 'libs/es6-promise/promise-1.0.0.min',
        'hammerjs': 'libs/hammer/hammer-2.0.4.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
        'signals': 'libs/js-signals/signals.min',

        'text': 'libs/require/text',

        //app specific libraries
        'crossroads': 'app/libs/crossroads/crossroads.min',
        'hasher': 'app/libs/crossroads/hasher.min',
        'iframe-transport' : 'app/libs/jquery/jquery.iframe-transport',
        'fileUpload' : 'app/libs/jquery/jquery.fileupload',
        'fileDownload' : 'app/libs/jquery/jquery.fileDownload',
        'iframeResizerjs' : 'app/libs/iframeResizer/iframeResizer.min',
        'iframeResizerContentjs' : 'app/libs/iframeResizer/iframeResizer.contentWindow.min'
    },

    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'fileUpload': {
            deps: ['jquery', 'jquery.ui.widget', 'iframe-transport'],
            exports: 'fileUpload'
        },
        'crossroads': {
            deps: ['signals'],
            exports: 'crossroads'
        },
        'fileDownload': {
            deps: ['jquery'],
            exports: 'fileDownload'
        },
        komapping: {
            deps: ['knockout'],
            exports: 'komapping'
        }
    },

    config: {
        /*i18n: {
         locale: 'fr-fr'
         },*/
        
    }
});

require([ ],
    function($) {
        
    });


requirejs.config({
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-route': 'bower_components/angular-route/angular-route',
        'ngstorage': 'bower_components/ngstorage/ngStorage'
    },
    shim: {
        'angular-route': {
            deps: ['angular']
        },
        'ngstorage': {
            deps: ['angular']
        }
    }
});

window.name = "NG_DEFER_BOOTSTRAP!";

define(['app']);
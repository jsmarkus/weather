
requirejs.config({
    paths: {
        'angular': 'bower_components/angular/angular'
    }
});

window.name = "NG_DEFER_BOOTSTRAP!";

define(['app']);
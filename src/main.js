if ('undefined' !== typeof process) {
    var gui = require('nw.gui');
    window.$gui = gui;
    var win = gui.Window.get();
    win.showDevTools();
}


requirejs.config({
    paths: {
        'angular': 'bower_components/angular/angular'
    }
});

window.name = "NG_DEFER_BOOTSTRAP!";



define(['app']);
define(function(require) {
    require('angular');
    require('services/module');

    function Tray() {
        var gui, tray, win;
        var self = this;
        if(this.isSupported()) {
            gui = window.nwDispatcher.requireNwGui();
            tray = new gui.Tray({icon:'weather.ico'});
            win = gui.Window.get();
            this.tray = tray;
            this.win = win;
            this.hide();
            this.tray.on('click', function () {
                self.toggle();
            });
            this.win.on('close', function () {
                self.hide();
            });
        }
    }

    Tray.prototype.isSupported = function() {
        return ('undefined' !== typeof process);
    };

    Tray.prototype.hide = function() {
        this.win.hide();
        this.hidden = true;
    };

    Tray.prototype.show = function() {
        this.win.show();
        this.hidden = false;
    };

    Tray.prototype.toggle = function() {
        if(this.hidden) {
            this.show();
        } else {
            this.hide();
        }
    };

    angular.module('services')
        .service('services.tray', [
            Tray
        ]);
});
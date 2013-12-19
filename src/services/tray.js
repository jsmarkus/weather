define(function(require) {
    require('angular');
    require('services/module');

    function Tray() {
        var win;
        if (this.isSupported()) {
            this.gui = window.nwDispatcher.requireNwGui();

            win = this.gui.Window.get();
            win.on('close', function() {
                this.hide();
            }.bind(this));
            this.win = win;

            this.tray = this._makeTray();
            this.hide();
        }
    }

    Tray.prototype._makeTray = function() {
        var menu = new this.gui.Menu();
        var miQuit = new this.gui.MenuItem({
            label: 'Выход',
            click: function() {
                this.win.close(true);
            }.bind(this)
        });
        var miTitle = new this.gui.MenuItem({
            label: 'Погода',
            click: function() {
                this.show();
            }.bind(this)
        });
        menu.append(miTitle);
        menu.append(miQuit);

        var tray = new this.gui.Tray({
            icon: './weather.png',
            menu: menu
        });
        tray.on('click', function() {
            this.toggle();
        }.bind(this));


        return tray;
    };

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
        if (this.hidden) {
            this.show();
        } else {
            this.hide();
        }
    };

    Tray.prototype.setTitle = function() {

    };

    angular.module('services')
        .service('services.tray', [
            Tray
        ]);
});
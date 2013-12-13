define(function(require) {
    require('angular');
    require('services/module');


    function Weather($log, $http, $interval, $timeout, $rootScope, $localStorage) {
        this.$log = $log;
        this.$http = $http;
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;

        this.data = {};
        this.__bindToOnline();
    }

    Weather.prototype.lang = 'ru';
    Weather.prototype.units = 'metric';
    Weather.prototype.pollPeriod = 15 * 60 * 1000;
    Weather.prototype.pollDelay = 3 * 1000;

    Weather.prototype.__getLocation = function () {
        return this.$localStorage.location || 'Kharkiv,ua';
    };

    Weather.prototype.__bindToOnline = function() {
        if (navigator.onLine) {
            this.__onOnline();
        } else {
            this.__onOffline();
        }
        angular.element(window).on('online', function() {
            this.$rootScope.$apply(this.__onOnline.bind(this));
        }.bind(this));
        angular.element(window).on('offline', function() {
            this.$rootScope.$apply(this.__onOffline.bind(this));
        }.bind(this));
    };

    Weather.prototype.__onOnline = function() {
        this.$log.debug('weather: online');
        this.start();
        this.data.online = true;
    };

    Weather.prototype.__onOffline = function() {
        this.$log.debug('weather: offline');
        this.stop();
        this.data.online = false;
    };

    Weather.prototype.start = function() {
        this.$log.debug('weather: service started');

        this.$interval.cancel(this.__interval);
        this.$timeout.cancel(this.__timeout);

        this.__interval = this.$interval(function() {
            this.get();
        }.bind(this), this.pollPeriod);

        this.__timeout = this.$timeout(function() {
            this.get();
        }.bind(this), this.pollDelay);
    };

    Weather.prototype.stop = function() {
        this.$log.debug('weather: service stopped');
        this.$interval.cancel(this.__interval);
        this.$timeout.cancel(this.__timeout);
    };

    Weather.prototype.get = function() {
        var data = this.data;
        data.loading = true;

        this.$http
            .jsonp('http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK', {
                params: {
                    q: this.__getLocation(),
                    lang: this.lang,
                    units: this.units
                }
            })
            .success(function(res) {
                this.$log.debug('data', res);
                data.wind = res.wind;
                data.main = res.main;
                data.desc = res.weather[0];
                data.locationName = res.name;
                data.loading = false;
            }.bind(this))
            .error(function() {
                data.loading = false;
            }.bind(this));
    };

    angular.module('services')
        .service('services.weather', [
            '$log',
            '$http',
            '$interval',
            '$timeout',
            '$rootScope',
            '$localStorage',
            Weather
        ]);
});
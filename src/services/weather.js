define(function(require) {
    require('angular');
    require('services/module');


    function Weather($http, $interval) {
        var self = this;

        this.$http = $http;
        this.$interval = $interval;
        this.data = {};

        this.$interval(function() {
            self.get();
        }, 60 * 15 * 1000);
        this.get();
    }

    Weather.prototype.lang = 'ru';
    Weather.prototype.location = 'Kharkiv,ua';
    Weather.prototype.units = 'metric';

    Weather.prototype.get = function() {
        var self = this;

        this.$http
            .jsonp('http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK', {
                params: {
                    q: this.location,
                    lang: this.lang,
                    units: this.units
                }
            })
            .success(function(res) {
                console.log('data', res);
                self.data.wind = res.wind;
                self.data.main = res.main;
                self.data.desc = res.weather[0];
            });
    };

    angular.module('services')
        .service('services.weather', [
            '$http',
            '$interval',
            Weather
        ]);
});
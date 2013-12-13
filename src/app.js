define(function(require) {
    require('angular');
    require('angular-route');
    require('ngstorage');
    require('controllers/weather');
    require('controllers/preferences');

    angular.element(document)
        .ready(function() {
            angular.resumeBootstrap();
        });

    var app = angular.module('monitor', [
        'ngRoute',
        'services',
        'directives',
        'controllers',
        'filters',
        'ngStorage'
    ]);

    app.config(['$routeProvider',
        function($routeProvider) {

            $routeProvider.when('/', {
                templateUrl: 'templates/weather.html',
                controller: 'WeatherController'
            });

            $routeProvider.when('/preferences', {
                templateUrl: 'templates/preferences.html',
                controller: 'PreferencesController'
            });

        }
    ]);

});
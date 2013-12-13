define(function(require) {
    require('angular');
    require('controllers/module');
    require('services/weather');
    require('services/tray');
    require('directives/w-icon');
    require('directives/w-wind');
    require('filters/hpa2mmhg');

    angular.module('controllers')
        .controller('WeatherController', [
            '$scope',
            'services.weather',
            'services.tray',
            function($scope, svcWeather, svcTray) {
                $scope.weather = svcWeather.data;
                $scope.updateWeather = function() {
                    svcWeather.get();
                };
            }
        ]);
});
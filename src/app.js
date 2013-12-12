define(function(require) {
    require('angular');
    require('services/weather');
    require('services/tray');
    require('directives/w-icon');
    require('directives/w-wind');
    require('filters/hpa2mmhg');

    angular.element(document)
        .ready(function() {
            angular.resumeBootstrap();
        });

    var app = angular.module('monitor', [
        'services',
        'directives',
        'filters']);

    app.controller('DashboardController', [
        '$scope',
        'services.weather',
        'services.tray',
        function($scope, svcWeather, svcTray) {
            $scope.weather = svcWeather.data;
            $scope.updateWeather = function () {
                svcWeather.get();
            };
        }
    ]);


});
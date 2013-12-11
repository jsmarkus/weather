define(function(require) {
    require('angular');
    require('services/weather');
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
        function($scope, svcWeather) {
            $scope.weather = svcWeather.data;
            // svcWeather.get().then(function(result) {
            //     console.log(result);
            //     $scope.weatherDesc = result.weather[0];
            //     $scope.weatherMain = result.main;
            //     $scope.weatherWind = result.wind;
            // });
        }
    ]);


});
define(function(require) {
    require('angular');
    require('directives/module');

    angular.module('directives')
        .directive('wIcon', function() {
            return {
                scope: {
                    icon: '='
                },
                restrict: 'EA',
                replace: true,
                template: '<img class="w-icon" ng-src="http://openweathermap.org/img/w/{{icon}}.png" />'
            };
        });
});
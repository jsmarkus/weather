define(function(require) {
    require('angular');
    require('directives/module');

    angular.module('directives')
        .directive('wWind', function() {
            return {
                scope: {
                    angle: '='
                },
                restrict: 'EA',
                replace: true,
                template: '<div class="w-wind" style="-webkit-transform:rotate({{angle}}deg)">↑</div>'
            };
        });
});
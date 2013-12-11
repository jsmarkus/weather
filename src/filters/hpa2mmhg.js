define(function(require) {
    require('angular');
    require('filters/module');

    angular.module('filters')
        .filter('hpa2mmhg', [function () {
            return function (value) {
                return value * 0.75006375541921;
            };
        }]);
});
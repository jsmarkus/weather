define(function(require) {
    require('angular');
    require('controllers/weather');

    angular.element(document)
        .ready(function() {
            angular.resumeBootstrap();
        });

    angular.module('monitor', [
        'services',
        'directives',
        'controllers',
        'filters']);

});
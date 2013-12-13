define(function(require) {
    require('angular');
    require('controllers/module');

    angular.module('controllers')
        .controller('PreferencesController', [
            '$scope',
            '$localStorage',
            function($scope, $localStorage) {
                $scope.storage = $localStorage
                    .$default({
                        location: 'Kharkiv,ua'
                    });
            }
        ]);
});
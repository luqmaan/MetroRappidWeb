angular.module('metroRappid', [
    'ngRoute',
    'metroRappid.filters',
    'metroRappid.services',
    'metroRappid.directives',
    'metroRappid.controllers',
    'leaflet-directive'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'partials/map.html',
            controller: 'MapCtrl'
        });
    }
]);

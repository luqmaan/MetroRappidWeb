'use strict';


// Declare app level module which depends on filters, and services
angular.module('metroRappid', [
    'ngRoute',
    'metroRappid.filters',
    'metroRappid.services',
    'metroRappid.directives',
    'metroRappid.controllers'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'partials/map.html',
            controller: 'MapCtrl'
        });
    }
]);

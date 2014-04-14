angular
    .module('metroRappid', [
        'ngRoute',
        'metroRappid.filters',
        'metroRappid.services',
        'metroRappid.directives',
        'metroRappid.controllers'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/vehicles', {
                templateUrl: 'partials/vehicles.html',
                controller: 'MapCtrl'
            });
        }
    ]);

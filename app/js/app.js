angular
    .module('metroRappid', [
        'ngRoute',
        'leaflet-directive',
        'metroRappid.filters',
        'metroRappid.services',
        'metroRappid.directives',
        'metroRappid.controllers'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/Route/:routeID/:directionID/Stops', {
                templateUrl: 'partials/stops.html',
                controller: 'RouteStopsCtrl'
            }).otherwise({redirectTo: '/Route/801/0/Stops'});
        }
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/Route/:routeID/:directionID', {
                templateUrl: 'partials/map.html',
                controller: 'RouteMapCtrl'
            }).otherwise({redirectTo: '/Route/801/0'});
        }
    ]);

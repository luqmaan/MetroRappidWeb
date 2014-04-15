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
            $routeProvider.when('/Route/:routeID/:directionID/Stops', {
                templateUrl: 'partials/stops.html',
                controller: 'RouteStopsCtrl'
            }).otherwise({redirectTo: '/Route/801/0/Stops'});
        }
    ]);

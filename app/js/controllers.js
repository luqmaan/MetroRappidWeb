define(['angular', 'services', 'angular-leaflet-directive', 'angularjs-geolocation', 'geolib'], function (angular) {

    angular.module('metroRappid.controllers', ['metroRappid.services.TripStops', 'metroRappid.services.TripShapes'])
    .controller('RouteTripStopsCtrl', function($scope, $routeParams, $log, $q, geolocation, TripStops, Geolib) {
        var deferredController = $q.defer(),
            errorHandler = function errorHandler(e) {
                console.log('error', e);
                $scope.activity = e;
                deferredController.reject(e);
            };

        $scope.routeID = $routeParams.routeID;
        $scope.directionID = $routeParams.directionID;
        $scope.activity = "Fetching stops";

        TripStops.get($scope.routeID, $scope.directionID).then(
            function(stops) {
                $scope.activity = "Updating location";
                $scope.stops = stops;

                geolocation.getLocation().then(function(location) {
                    $scope.activity = 'Finding closest location';
                    $scope.location = location;

                    console.log($scope.location.coords, $scope.stops);

                    Geolib.orderByDistance($scope.location.coords, $scope.stops).forEach(function(stop, i) {
                        $scope.stops[i].distance = stop.distance;
                    });

                    $scope.activity = false;
                    deferredController.resolve();

                }, errorHandler);
            },
            errorHandler,
            function() {
                console.log('notify', arguments);
            }
        );

        // return a promise so we can test without using setTimeout
        return deferredController.promise;
    });

    angular.module('metroRappid.controllers')
    .controller('RouteMapCtrl', function($scope, $routeParams, $log, $q, TripStops, TripShapes) {
        angular.extend($scope, {
            routeID: $routeParams.routeID,
            directionID: $routeParams.directionID,
            center: {
                lat: 30.29,
                lng: -97.743061,
                zoom: 11
            },
            paths: {}
        });

        TripShapes.get($routeParams.routeID, $routeParams.directionID).then(function(shape) {
            $scope.paths.p1 = {
                color: 'rgb(206,36,41)',
                weight: 8,
                latlngs: shape
            };
        }, function(e) { console.error(e); });
    });

});

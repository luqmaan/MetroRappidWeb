angular.module('metroRappid.controllers', ['metroRappid.services.TripStops', 'metroRappid.services.TripShapes', 'geolocation', 'metroRappid.services.Geolib'])
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
})
.controller('RouteMapCtrl', function($scope, $routeParams, $log, $q, TripStops, TripShapes) {
    console.log('lol', TripStops);
    console.log('lol', TripShapes);
});


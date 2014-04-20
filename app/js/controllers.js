angular.module('metroRappid.controllers', ['metroRappid.services.Stops', 'geolocation', 'metroRappid.services.Geolib'])
    .controller('RouteStopsCtrl', function($scope, $routeParams, $log, $q, Stops, geolocation, Geolib) {
        var deferredController = $q.defer(),
            errorHandler = function errorHandler(e) {
                console.log('error', e);
                $scope.activity = e;
                deferredController.reject(e);
            };

        $scope.routeID = $routeParams.routeID;
        $scope.directionID = $routeParams.directionID;
        $scope.activity = "Fetching stops";

        Stops.get($scope.routeID, $scope.directionID).then(
            function(stops) {
                $scope.activity = "Updating location";
                $scope.stops = stops;

                console.log('oijwefoijwef');

                geolocation.getLocation().then(function(location) {
                    console.log('hehEHEHEH');
                    location.lat = location.latitude;
                    location.lon = location.longtitude;

                    $scope.activity = 'Finding closest location';
                    $scope.location = location;
                    console.log('hehEHEHEH');

                    console.log($scope.location.coords, $scope.stops);

                    Geolib.orderByDistance($scope.location.coords, $scope.stops).forEach(function(stop, i) {
                        $scope.stops[i].distance = stop.distance;
                        console.log('distance', stop.distance, $scope.stops[i].distance);
                    });

                    console.log('hehEHEHEH');
                    $scope.activity = false;
                    console.log('hehEHEHEH fineale');

                    deferredController.resolve();

                }, errorHandler);
            },
            errorHandler,
            function() {
                console.log('notify', arguments);
            }
        );

    return deferredController.promise;
});

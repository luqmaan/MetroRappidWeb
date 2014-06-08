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

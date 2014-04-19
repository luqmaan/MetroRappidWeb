angular.module('metroRappid.controllers', ['metroRappid.services.Stops', 'geolocation', 'metroRappid.services.Geolib'])
    .controller('RouteStopsCtrl', function($scope, $routeParams, $log, Stops, geolocation, Geolib) {
        var errorHandler = function errorHandler(e) {
            console.log('error', e);
            $scope.activity = e;
        };

        $scope.routeID = $routeParams.routeID;
        $scope.directionID = $routeParams.directionID;
        $scope.activity = "Fetching stops";

        Stops.get($scope.routeID, $scope.directionID).then(
            function(stops) {
                $scope.activity = "Updating location";
                $scope.stops = stops;
                $log.warn("haha");

                geolocation.getLocation().then(function(location) {
                    console.log(location);
                    location.lat = location.latitude;
                    location.lon = location.longtitude;

                    $scope.activity = false;
                    $scope.location = location;

                    console.log($scope.location.coords, $scope.stops);
                }, errorHandler);
            },
            errorHandler,
            function() {
                console.log('notify', arguments);
            }
        );
    });

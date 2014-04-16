angular.module('metroRappid.controllers', ['metroRappid.services.Stops', 'geolocation'])
    .controller('RouteStopsCtrl', function($scope, Stops, $routeParams, geolocation) {
        $scope.routeID = $routeParams.routeID;
        $scope.directionID = $routeParams.directionID;
        $scope.activity = "Fetching stops";

        var errorHandler = function errorHandler(e) {
            console.log('error', e);
            $scope.activity = e;
        };

        Stops.get($scope.routeID, $scope.directionID).then(
            function(stops) {
                $scope.activity = "Updating location";

                $scope.stops = stops;
                geolocation.getLocation().then(function(data) {
                    $scope.activity = false;

                    $scope.coords = {lat: data.coords.latitude,long: data.coords.longitude};
                    console.log('coords', $scope.coords);
                }, errorHandler);
            },
            errorHandler,
            function() {
                console.log('notify', arguments);
            }
        );
    });

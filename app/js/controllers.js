angular.module('metroRappid.controllers', ['metroRappid.services.Stops', 'geolocation', 'metroRappid.services.Geolib'])
    .controller('RouteStopsCtrl', function($scope, Stops, $routeParams, geolocation, Geolib) {
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

                // console.log('$q', $q.defer());
                // var abc = $q.defer();
                // geolocation.getLocation = abc.resolve.bind($q, {coords: {latitude: 30.265983199999997, longtitude: -97.7463879}});

                geolocation.getLocation().then(function(location) {
                    console.log(location);
                    location.lat = location.latitude;
                    location.lon = location.longtitude;

                    $scope.activity = false;
                    $scope.location = location;

                    console.log($scope.location.coords, $scope.stops);
                    Geolib.orderByDistance();

                }, errorHandler);
            },
            errorHandler,
            function() {
                console.log('notify', arguments);
            }
        );
    });

angular
.module('metroRappid.controllers', ['metroRappid.services.Stops'])
.controller('RouteStopsCtrl', function ($scope, Stops, $routeParams) {
    $scope.routeID = $routeParams.routeID;
    $scope.directionID = $routeParams.directionID;

    Stops.get($scope.routeID, $scope.directionID).then(
        function(stops) {
            console.log('resolve', arguments);
            $scope.stops = stops;
        },
        function() { console.error('reject', arguments); },
        function() { console.log('notify', arguments); }
    );
});




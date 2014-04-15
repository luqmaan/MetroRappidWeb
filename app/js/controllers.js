angular.module('metroRappid.controllers', ['metroRappid.services.Stops', 'metroRappid.filters'])
    .controller('RouteStopsCtrl', function ($scope, Stops, $routeParams, $filter) {
        $scope.routeID = $routeParams.routeID;
        $scope.directionID = $routeParams.directionID;

        window.$filter = $filter;
        console.log('$filter', $filter);
        Stops.get($scope.routeID, $scope.directionID).then(
            function(stops) {
                $scope.stops = stops;
            },
            function() { console.error('reject', arguments); },
            function() { console.log('notify', arguments); }
        );
    });




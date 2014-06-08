define(['angular', 'services'], function (angular, services) {

    angular.module('metroRappid.filters', [])
        .filter('directionify', function() {
            return function(directionID) {
                return {
                    0: 'North',
                    1: 'South',
                    2: 'East',
                    3: 'West'
                }[directionID];
            };
        });

});

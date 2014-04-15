angular
.module('metroRappid.filters', [])
.filter('directionify',
    function(directionID) {
        return {
            0: 'North',
            1: 'South',
            2: 'East',
            3: 'West'
        }[directionID];
    }
);

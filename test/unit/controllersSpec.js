describe('controllers', function() {

    describe('RouteStopsCtrl', function() {
        var $scope,
            $q,
            $log,
            _rootscope,
            _timeout,
            RouteStopsCtrl;


        beforeEach(function() {
            angular.mock.module('metroRappid.controllers');
            angular.mock.inject(function($rootScope, $controller, $q, $timeout, $injector) {

                $scope = $rootScope.$new();

                RouteStopsCtrl = $controller('RouteStopsCtrl', {
                    $scope: $scope,
                    $routeParams: {routeID: 801, directionID: 0},
                    $log: $log,
                    geolocation: {
                        getLocation: function() {
                            var deferred = $q.defer(),
                                location = {coords: {latitude: 30.265983199999997, longitude: -97.7463879}};

                            setTimeout(function() {
                                deferred.resolve(location);
                                $rootScope.$apply();
                            }, 0);

                            return deferred.promise;
                        }
                    },
                    Stops: {
                        get: function() {
                            var deferred = $q.defer(),
                                stops = [{stop_id:'5873',stop_name:'SOUTHPARK MEADOWS STATION',stop_desc:'Northeast corner of TURK and CULLEN - Mid-Block',direction_id:'0',trip_headsign:'NORTHBOUND',latitude:'30.162951',route_id:'801',longitude:'-97.790488',stop_sequence:'1',trip_id:'1335341'},{stop_id:'4382',stop_name:'PLEASANT HILL STATION (NB)',stop_desc:'Northeast corner of CONGRESS and WILLIAM CANNON - Mid-Block',direction_id:'0',trip_headsign:'NORTHBOUND',latitude:'30.194185',route_id:'801',longitude:'-97.778261',stop_sequence:'2',trip_id:'1335341'}];

                            setTimeout(function() {
                                deferred.resolve(stops);
                                $rootScope.$apply();
                            }, 0);

                            return deferred.promise;
                        }
                    },
                });
            });
        });

        it('should pass', function(done) {
            RouteStopsCtrl.then(function() {
                expect($scope.stops[0].stop_name).toBe('SOUTHPARK MEADOWS STATION');
                expect($scope.stops[0].distance).toBe(8530);
                done();
            }, function(e) { throw e; });
        });

        it('should not fail, but does because geolib is undefined ;_:', function(done) {
            RouteStopsCtrl.then(function() {
                expect($scope.stops[0].stop_name).toBe('SOUTHPARK MEADOWS STATION');
                expect($scope.stops[0].distance).toBe(8530);
                done();
            }, function(e) { throw e; });
        });

    });
});

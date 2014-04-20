describe('controllers', function() {

    describe('RouteStopsCtrl', function() {
        var $scope,
            $q,
            $log,
            _rootscope,
            _timeout,
            Geolib,
            createController;

        beforeEach(angular.mock.module('metroRappid.controllers'));

        beforeEach(angular.mock.inject(function($rootScope, $controller, $q, $timeout, $injector) {
            _rootscope = $rootScope;
            _timeout = $timeout;
            $scope = _rootscope.$new();
            $q = $q;
            $log = $injector.get('$log');
            Geolib = $injector.get('Geolib');

            createController = function(injections) {
                var defaultInjections = {
                    $scope: $scope,
                    $routeParams: {},
                    $log: $log,
                    Geolib: Geolib,
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
                };
                console.error('Geolib', $injector.get('Geolib'), '**************************', $injector.get('Geolib'));
                return $controller('RouteStopsCtrl', angular.extend(defaultInjections, injections));
            };
        }));

        // it('should add stops to $scope', function(done) {
        //     var RouteStopsCtrl = createController();

        //     RouteStopsCtrl.then(function() {
        //         expect(Geolib).not.toBe(undefined);
        //         expect($scope.stops[0].stop_name).toBe('SOUTHPARK MEADOWS STATION');
        //         done();
        //     }, function(e) { throw e; });
        // });

        it('should add distance to the stops', function(done) {
            var RouteStopsCtrl = createController();

            RouteStopsCtrl.then(function() {
                expect(Geolib).not.toBe(undefined);
                expect($scope.stops[0].stop_name).toBe('SOUTHPARK MEADOWS STATION');
                expect($scope.stops[0].distance).toBe(8530);
                done();
            }, function(e) { throw e; });
        });

    });
});

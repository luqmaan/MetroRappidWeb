describe('controllers', function() {
    var stops = [{stop_id:"5873",stop_name:"SOUTHPARK MEADOWS STATION",stop_desc:"Northeast corner of TURK and CULLEN - Mid-Block",direction_id:"0",trip_headsign:"NORTHBOUND",latitude:"30.162951",route_id:"801",longtitude:"-97.790488",stop_sequence:"1",trip_id:"1335341"},{stop_id:"4382",stop_name:"PLEASANT HILL STATION (NB)",stop_desc:"Northeast corner of CONGRESS and WILLIAM CANNON - Mid-Block",direction_id:"0",trip_headsign:"NORTHBOUND",latitude:"30.194185",route_id:"801",longtitude:"-97.778261",stop_sequence:"2",trip_id:"1335341"}];

    describe('RouteStopsCtrl', function() {
        var $scope,
            $q,
            $log,
            _rootscope,
            _timeout,
            createController;

        beforeEach(angular.mock.module('metroRappid.controllers'));

        beforeEach(angular.mock.inject(function($rootScope, $controller, $q, $timeout, $injector) {
            _rootscope = $rootScope;
            _timeout = $timeout;
            $scope = _rootscope.$new();
            $q = $q;
            $log = $injector.get('$log');

            createController = function(injections) {
                var defaultInjections = {
                    $scope: $scope,
                    $routeParams: {},
                    $log: $log,
                    Geolib: {},
                    geolocation: {
                        getLocation: function() {
                            var location = {coords: {latitude: 30.265983199999997, longtitude: -97.7463879}},
                                deferred = $q.defer();
                            deferred.resolve(location);
                            return deferred.promise;
                        }
                    },
                    Stops: {
                        get: function() {
                            var deferred = $q.defer();
                            setTimeout(function() {
                                deferred.resolve(stops);
                                $rootScope.$apply();
                            }, 10, true);
                            return deferred.promise;
                        }
                    },
                };
                return $controller('RouteStopsCtrl', angular.extend(defaultInjections, injections));
            };
        }));

        it('should add stopIndex to the stops', function(done) {
            var RouteStopsCtrl = createController();
            setTimeout(function() {
                try {
                    expect($scope.stops).toBe(stops);
                    done();
                }
                catch (e) {
                    done(e);
                }
            }, 10);
        });
    });

});

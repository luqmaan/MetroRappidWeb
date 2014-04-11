angular
    .module('metroRappid.services', [])
    .value('version', '0.1');

angular
    .module('metroRappid.services.NextBus', [])
    .factory('NextBus', function($http, $q) {
        return {
            get: function(routeId, stopId) {
                var method = 'GET',
                    url = '/test/data/s_nextbus2/801-realtime-feb-22.xml',
                    deferred = $q.defer();
                console.log('GET', url);

                $http({method: method, url: url})
                    .success(function(data, status, headers, config) {
                        console.log('success');
                        deferred.resolve(data);
                    })
                    .error(deferred.reject);

                return deferred.promise;
            }
        };
    });

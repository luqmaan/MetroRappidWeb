angular.module('metroRappid.services', []).value('version', '0.1');

angular.module('metroRappid.services.NextBus', [])
.factory('NextBus', function($http, $q, XmlToYavaScript) {
    return {
        xmlParser: null,
        parse: function(xmlStr) {
            if (!this.xmlParser) this.xmlParser = new XmlToYavaScript();  // FIXME: load properly

            var xml = this.xmlParser.xml_str2json(xmlStr);

            return xml.Envelope.Body.Nextbus2Response;
        },
        get: function(routeId, stopId) {
            var self = this,
                method = 'GET',
                url = '/test/data/s_nextbus2/801-realtime-feb-22.xml',
                deferred = $q.defer();

            console.log('GET', url);

            $http({method: method, url: url})
                .success(function(xml, status, headers, config) {
                    console.log(url, xml);
                    var data = self.parse(xml);
                    deferred.resolve(data);
                })
                .error(deferred.reject);

            return deferred.promise;
        }
    };
});

angular.module('metroRappid.services.TripStops', [])
.factory('TripStops', function($http, $q) {
    return {
        get: function(routeId, directionID) {
            var self = this,
                method = 'GET',
                url = '/app/data/stops_' + routeId + '_' + directionID + '.json',
                deferred = $q.defer();

            console.log(method, url);

            $http({method: method, url: url})
                .success(function(data, status, headers, config) {
                    data.forEach(function(stop) {
                        stop.latitude = stop.stop_lat;
                        stop.longitude = stop.stop_lon;
                    });
                    deferred.resolve(data);
                })
                .error(deferred.reject);

            return deferred.promise;
        }
    };
});

angular.module('metroRappid.services.TripShapes', [])
.factory('TripShapes', function($http, $q) {
    return {
        get: function(routeId, directionID) {
            var self = this,
                method = 'GET',
                url = '/app/data/shapes_' + routeId + '_' + directionID + '.json',
                deferred = $q.defer();

            console.log(method, url);

            $http({method: method, url: url})
                .success(function(data, status, headers, config) {
                    var result = [];
                    data.forEach(function(point) {
                        result.push(new L.LatLng(point.shape_pt_lat, point.shape_pt_lon));
                    });
                    deferred.resolve(result);
                })
                .error(deferred.reject);

            return deferred.promise;
        }
    };
});


angular.module('metroRappid.services.Geolib', [])
.factory('Geolib', function() {
    // FIXME: ;_;
    return window.geolib;
});

angular.module('metroRappid.services.XmlToYavaScript', [])
.factory('XmlToYavaScript', function() {
    // FIXME: ;_;
    return window.X2JS;
});

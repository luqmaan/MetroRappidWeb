angular.module('metroRappid.services', []).value('version', '0.1');

angular.module('metroRappid.services.NextBus', [])
.factory('NextBus', function($http, $q) {
    return {
        xmlParser: null,
        parse: function(xmlStr) {
            if (!this.xmlParser) this.xmlParser = new X2JS();  // FIXME: load properly

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

angular.module('metroRappid.services.Stops', [])
.factory('Stops', function($http, $q) {
    return {
        get: function(routeId, directionID) {
            var self = this,
                method = 'GET',
                url = '/app/data/stops_' + routeId + '_' + directionID + '.json',
                deferred = $q.defer();

            console.log(method, url);

            $http({method: method, url: url})
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(deferred.reject);

            return deferred.promise;
        }
    };
});

angular.module('metroRappid.services.Geolib', [])
.factory('Geolib', function() {
    // FIXME: ;_;
    var leGeolib = window.geolib;
    delete window.geolib;
    return leGeolib;
});

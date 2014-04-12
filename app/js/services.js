angular
    .module('metroRappid.services', [])
    .value('version', '0.1');

angular
    .module('metroRappid.services.NextBus', [])
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

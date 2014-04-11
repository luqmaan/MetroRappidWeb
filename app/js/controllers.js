angular
    .module('metroRappid.controllers', ['metroRappid.services.NextBus'])
    .controller('MapCtrl', function ($scope, NextBus) {
        var map = new L.Map('map'),
            osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            osm = new L.TileLayer(osmUrl, {
                minZoom: 12,
                attribution: osmAttrib
            }),
            vehicles;

        map.setView(new L.LatLng(30.267153, -97.743061), 12);
        map.addLayer(osm);

        NextBus.get('abc').then(
            function() { console.log(arguments); },
            function() { console.error(arguments); },
            function() { console.log(arguments); });

    });




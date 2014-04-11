'use strict';

/* Controllers */

function mapCtrl() {
    var map = new L.Map('map'),
        osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        osm = new L.TileLayer(osmUrl, {
            minZoom: 12,
            attribution: osmAttrib
        });

    map.setView(new L.LatLng(30.267153, -97.743061), 12);
    map.addLayer(osm);
}


angular
    .module('metroRappid.controllers', [])
    .controller('MapCtrl', [mapCtrl]);


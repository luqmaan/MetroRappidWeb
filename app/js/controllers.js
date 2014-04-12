angular
    .module('metroRappid.controllers', ['metroRappid.services.NextBus'])
    .controller('MapCtrl', function ($scope, NextBus) {
        angular.extend($scope, {
            defaults: {
                tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                minZoom: 12,
                maxZoom: 16,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            },
            center: {
                lat: 30.267153,
                lng: -97.743061,
                zoom: 12
            }
        });

        NextBus.get('abc').then(
            function(xml) { window.xml = xml; console.log(arguments); },
            function() { console.error(arguments); }
            // function() { console.log(arguments); }
        );

    });




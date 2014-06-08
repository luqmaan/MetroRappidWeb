require.config({
    paths: {
        angular: '../../bower_components/angular/angular',
        angularRoute: '../../bower_components/angular-route/angular-route',
        angularMocks: '../../bower_components/angular-mocks/angular-mocks',
        'angularjs-geolocation': '../../bower_components/angularjs-geolocation/dist/angularjs-geolocation.min',
        'angular-leaflet-directive': '../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive',
        geolib: '../../bower_components/geolib/dist/geolib',
        leaflet: '../../bower_components/leaflet/dist/leaflet',
        text: '../../bower_components/requirejs-text/text',
        xml2json: '../../bower_components/x2js/xml2json',
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angular-leaflet-directive': {
            exports: 'angular-leaflet-directive',
            deps: ['angular', 'leaflet']
        },
        'angularjs-geolocation': {
            exports: 'angularjs-geolocation',
            deps: ['angular']
        },
        'geolib': {exports: 'geolib'},
        'xml2json': {exports: 'X2JS'}
    },
    priority: [
        'angular'
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'angular',
    'app'
], function(angular, app) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    console.log('app', app.name);
    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});

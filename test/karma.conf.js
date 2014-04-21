module.exports = function(config) {
    config.set({
        basePath: '../',
        logLevel: 'ALL',
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angularjs-geolocation/dist/angularjs-geolocation.min.js',
            'bower_components/x2js/xml2json.js',
            'bower_components/geolib/geolib.js',
            'app/js/**/*.js',
            'test/unit/**/*.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};

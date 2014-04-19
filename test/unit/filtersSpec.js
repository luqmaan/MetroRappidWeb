describe('filter', function() {
    // https://github.com/frapontillo/angular-filters/blob/master/test/default/defaultSpec.js

    beforeEach(module('metroRappid.filters'));

    describe('directionify', function() {
        it('should turn a direction number into a string', inject(function($filter) {
            var directionify = $filter('directionify');

            expect(directionify(0)).toEqual('North');
            expect(directionify(1)).toEqual('South');
            expect(directionify(2)).toEqual('East');
            expect(directionify(3)).toEqual('West');
        }));
    });
});

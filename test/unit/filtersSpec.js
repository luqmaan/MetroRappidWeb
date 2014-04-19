describe('filter', function() {
    var directionifyFilter;
    // https://github.com/frapontillo/angular-filters/blob/master/test/default/defaultSpec.js

    beforeEach(module('metroRappid.filters'));
    beforeEach(inject(function($filter) {
        directionifyFilter = $filter('directionify');
    }));

    describe('directionify', function() {
        it('should turn a direction number into a string', function() {
            expect(directionifyFilter(0)).toEqual('North');
            expect(directionifyFilter(1)).toEqual('South');
            expect(directionifyFilter(2)).toEqual('East');
            expect(directionifyFilter(3)).toEqual('West');
        });
    });
});

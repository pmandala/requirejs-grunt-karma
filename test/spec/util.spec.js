'use strict';

define(['chai', 'jquery'], function(chai) {

    describe('testing', function() {

        it('true or false', function() {
            chai.expect(true).to.be.true;

            chai.expect(false).to.be.false;
        });

    });
});

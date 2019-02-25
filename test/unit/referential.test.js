process.env.NODE_ENV = 'test';

const ref = require('../../lib/referential');
const chai = require('chai');
const expect = chai.expect;


describe('referential.js library unit tests', () => {
    describe('immutability', () => {
        it('expect the lib to be immutable', (done) => {
            const referential = ref;
            ref.foo = () => { console.log('this is a test')};
            expect(ref).to.deep.equal(referential);
            done();
        });
    });
});

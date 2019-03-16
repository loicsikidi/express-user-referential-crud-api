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

    describe('stucture', () => {
        it('expect to get expected properties', (done) => {
            expect(ref).to.be.a('object');
            expect(ref).to.have.property('OPENAPI_DEFAULT_QUERY_PARAM');
            expect(ref).to.have.property('STATUS_INTERN_CODE');
            expect(ref).to.have.property('STATUS_TRAINEE_CODE');
            expect(ref).to.have.property('STATUS_SERVICE_PROVIDER_CODE');
            expect(ref).to.have.property('DB_ERRORS');
            done();
        });
    });
});

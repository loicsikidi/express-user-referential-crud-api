process.env.NODE_ENV = 'test';

const configuration = require('../../lib/configuration');
const chai = require('chai');
const expect = chai.expect;

describe('configuration.js library unit tests', () => {
    describe('immutability', () => {
        it('expect the lib to be immutable', (done) => {
            const config = configuration;
            configuration.foo = () => { console.log('this is a test')};
            expect(configuration).to.deep.equal(config);
            done();
        });
    });

    describe('stucture', () => {
        it('expect to get expected properties', (done) => {
            expect(configuration).to.be.a('object');
            expect(configuration).to.have.property('ENV');
            expect(configuration.ENV).to.equal('test');
            expect(configuration).to.have.property('PORT');
            expect(configuration).to.have.property('DATABASE_TYPE');
            expect(configuration).to.have.property('DATABASE_NAME');
            expect(configuration).to.have.property('DATABASE_USERNAME');
            expect(configuration).to.have.property('DATABASE_PASSWORD');
            expect(configuration).to.have.property('DATABASE_HOSTNAME');
            done();
        });
    });
});

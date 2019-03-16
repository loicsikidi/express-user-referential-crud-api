process.env.NODE_ENV = 'test';

const u = require('../../lib/utils');
const { OpenapiParameter } = require('../../lib/openapi_parameter');
const chai = require('chai');
const expect = chai.expect;

describe('OpenapiParameter class unit tests', () => {
    describe('OpenapiParameter: toObject', () => {
        it('expect to have the expected response (lighty constructor)', (done) => {
            const expectedObj = Object.freeze({
                in: "query",
                type: "integer",
                name: "foo",
                default: 0
            });
            const openapiParameter  = new OpenapiParameter("foo");
            expect(openapiParameter.toObject()).to.deep.equal(expectedObj);
            done();
        });
        it('expect to have the expected response (full constructor)', (done) => {
            const name = "foo", defaultValue = 1000, type = "integer";
            const expectedObj = Object.freeze({
                in: "query",
                type: "integer",
                name: "foo",
                default: 1000
            });
            const openapiParameter  = new OpenapiParameter(name, defaultValue, type);
            expect(openapiParameter.toObject()).to.deep.equal(expectedObj);
            done();
        });
    });
});
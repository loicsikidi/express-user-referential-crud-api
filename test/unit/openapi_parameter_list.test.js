process.env.NODE_ENV = 'test';

const u = require('../../lib/utils');
const { OpenapiParameterList, OpenapiParameter } = require('../../lib/openapi_parameter');
const { InternalError } = require("../../lib/errors");
const chai = require('chai');
const expect = chai.expect;

describe('OpenapiParameterList class unit tests', () => {
    describe('OpenapiParameterList: constructor', () => {
        it('expect to have the expected behaviour', (done) => {
            const openapiList = new OpenapiParameterList();
            expect(openapiList).to.be.an.instanceof(OpenapiParameterList);
            expect(openapiList.params).have.lengthOf(0);
            done();
        });
        it('expect to have an InternalError because the argument is not OpenapiParameter type', (done) => {
            const  badFn = function () { new OpenapiParameterList(['foo', 'bar']); }
            expect(badFn).to.throw(InternalError);
            done();
        });
    });

    describe('OpenapiParameterList: toArray', () => {
        it('expect to have the expected response', (done) => {
            const expectedList = [{
                in: "query",
                type: "string",
                name: "foo",
                default: "bar"
            },
            {
                in: "query",
                type: "integer",
                name: "baz",
                default: 0
            }];
            const openapiList = new OpenapiParameterList(new OpenapiParameter("foo", "bar", "string"), new OpenapiParameter('baz'));
            expect(openapiList.toArray()).to.deep.equal(expectedList);
            done();
        });
    });

    describe('OpenapiParameterList: getParam', () => {
        it('expect to have the expected response', (done) => {
            const expectedParam = {
                scope: "query",
                type: "integer",
                name: "foo",
                default_value: 0
            };
            const openapiList = new OpenapiParameterList(new OpenapiParameter("foo"), new OpenapiParameter('baz'));
            expect(openapiList.getParam("foo")).to.deep.equal(expectedParam);
            done();
        });
    });

    describe('OpenapiParameterList: setParam', () => {
        it('expect to have the expected behaviour', (done) => {
            const openapiList = new OpenapiParameterList();
            expect(openapiList.toArray()).have.lengthOf(0);
            openapiList.setParam(new OpenapiParameter('baz'));
            expect(openapiList.toArray()).have.lengthOf(1);
            done();
        });
        it('expect to have an InternalError because the argument is not OpenapiParameter type', (done) => {
            const openapiList = new OpenapiParameterList();
            const  badFn = function () { openapiList.setParam("foo"); }
            expect(badFn).to.throw(InternalError);
            done();
        });
    });
});
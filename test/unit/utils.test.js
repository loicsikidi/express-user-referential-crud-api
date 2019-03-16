process.env.NODE_ENV = 'test';

const u = require('../../lib/utils');
const { InternalError } = require("../../lib/errors");
const { OpenApiValidator } = require("express-openapi-validate");
const chai = require('chai');
const expect = chai.expect;


describe('utils.js library unit tests', () => {
    describe('immutability', () => {
        it('expect the lib to be immutable', (done) => {
            const util = u;
            u.foo = () => { console.log('this is a test')};
            expect(u).to.deep.equal(util);
            done();
        });
    });

    describe('randomUuid', () => {
        it('expect to have a valid uuid v4', (done) => {
            const uuid = u.randomUuid();
            expect(uuid).have.lengthOf(36);
            expect(uuid).to.match(/^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/)
            done();
        });
    });

    describe('md5', () => {
        it('expect to have a valid md5', (done) => {
            const md5 = u.md5('foobar');
            expect(md5).have.lengthOf(32);
            expect(md5).to.match(/^[a-f0-9]{32}$/)
            done();
        });
        it('expect to throw an InternalError because the argument is undefined', (done) => {
            expect(function() {
                u.md5();
            }).throw(InternalError);
            done();
        });
        it('expect to throw an InternalError because the argument is empty', (done) => {
            expect(function() {
                u.md5('');
            }).throw(InternalError);
            done();
        });
    });

    describe('emailToUuid', () => {
        it('expect to have a valid uuid v4 with the correct value', (done) => {
            const expectedUuid = "0887da7d-0906-52c8-9cd5-65c04b969c08";
            const uuid = u.emailToUuid('john.doe@test.com');
            expect(uuid).have.lengthOf(36);
            expect(uuid).to.match(/^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/)
            expect(uuid).to.equal(expectedUuid);
            done();
        });
        it('expect to throw an InternalError because the argument is undefined', (done) => {
            expect(function() {
                u.emailToUuid();
            }).throw(InternalError);
            done();
        });
        it('expect to throw an InternalError because the argument is empty', (done) => {
            expect(function() {
                u.emailToUuid('');
            }).throw(InternalError);
            done();
        });
    });

    describe('mapToCollectionStructure', () => {
        it('expect to have the expected response', (done) => {
            const limit = 50, offset = 0, count = 10, collectionName = 'test',
            collection = Object.freeze([ {"foo": "bar", "bar" : "foo"},
            {"foo": "foo", "bar" : "bar"},
            ]);
            const expectedCollectionStructure = Object.freeze({
                count: 10,
                test: [ {"foo": "bar", "bar" : "foo"},
                {"foo": "foo", "bar" : "bar"},
                ],
                limit: 50,
                offset: 0
            });
            const collectionStructure = u.mapToCollectionStructure(limit, offset, count, collectionName, collection);
            expect(collectionStructure).to.deep.equal(expectedCollectionStructure);
            done();
        });
    });
    
    describe('function cleanRessource', () => {
        it('expect to have the expected response (include strategy)', (done) => {
            const resource = Object.freeze({
                aaa: "aaa",
                bbb: "bbb",
                ccc: "ccc"
            });
            const scope = ['aaa', 'ccc'];
            const expectedObj = Object.freeze({
                aaa: "aaa",
                ccc: "ccc"
            });
            const obj = u.cleanRessource(resource, scope);
            expect(obj).to.deep.equal(expectedObj);
            done();
        });
        it('expect to have the expected response (exclude strategy)', (done) => {
            const resource = Object.freeze({
                aaa: "aaa",
                bbb: "bbb",
                ccc: "ccc"
            });
            const scope = ['bbb'];
            const expectedObj = Object.freeze({
                aaa: "aaa",
                ccc: "ccc"
            });
            const obj = u.cleanRessource(resource, scope, false);
            expect(obj).to.deep.equal(expectedObj);
            done();
        });
    });

    describe('openApiValidator', () => {
        it('expect to have a instance OpenApiValidator class', (done) => {
            expect(u.openApiValidator()).to.be.an.instanceof(OpenApiValidator);
            done();
        });
    });
});

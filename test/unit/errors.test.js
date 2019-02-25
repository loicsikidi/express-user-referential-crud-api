process.env.NODE_ENV = 'test';

const u = require('../../lib/utils');
const { NotFoundError, ForbiddenError, UnauthorizedError, DuplicateError, InternalError } = require("../../lib/errors");
const chai = require('chai');
const expect = chai.expect;

describe('errors.js library unit tests', () => {
    describe('InternalError', () => {
        it('expect to throw an InternalError with expected properties', (done) => {
            const err = new InternalError('Illegal statement');
            const  badFn = function () { throw err; }
            expect(badFn).to.throw(InternalError);
            expect(err).to.have.property('status', 500);
            expect(err).to.have.property('name', 'internal_error');
            expect(err).to.have.property('message', 'Illegal statement');
            done();
        });
    });
    
    describe('NotFoundError', () => {
        it('expect to throw an NotFoundError with expected properties', (done) => {
            const err = new NotFoundError('Illegal statement');
            const  badFn = function () { throw err; }
            expect(badFn).to.throw(NotFoundError);
            expect(err).to.have.property('status', 404);
            expect(err).to.have.property('name', 'not_found');
            expect(err).to.have.property('message', 'Illegal statement');
            done();
        });
    });

    describe('ForbiddenError', () => {
        it('expect to throw an ForbiddenError with expected properties', (done) => {
            const err = new ForbiddenError('Illegal statement');
            const  badFn = function () { throw err; }
            expect(badFn).to.throw(ForbiddenError);
            expect(err).to.have.property('status', 403);
            expect(err).to.have.property('name', 'forbidden');
            expect(err).to.have.property('message', 'Illegal statement');
            done();
        });
    });

    describe('UnauthorizedError', () => {
        it('expect to throw an UnauthorizedError with expected properties', (done) => {
            const err = new UnauthorizedError('Illegal statement');
            const  badFn = function () { throw err; }
            expect(badFn).to.throw(UnauthorizedError);
            expect(err).to.have.property('status', 401);
            expect(err).to.have.property('name', 'unauthorized');
            expect(err).to.have.property('message', 'Illegal statement');
            done();
        });
    });

    describe('DuplicateError', () => {
        it('expect to throw an DuplicateError with expected properties', (done) => {
            const err = new DuplicateError('Illegal statement');
            const  badFn = function () { throw err; }
            expect(badFn).to.throw(DuplicateError);
            expect(err).to.have.property('status', 409);
            expect(err).to.have.property('name', 'conflict');
            expect(err).to.have.property('message', 'Illegal statement');
            done();
        });
    });
});
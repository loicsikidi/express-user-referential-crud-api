process.env.NODE_ENV = 'test';

const logger = require('../../lib/logger');
const chai = require('chai');
const expect = chai.expect;

describe('logger module unit tests', () => {
    describe('immutability', () => {
        it('expect the lib to be immutable', (done) => {
            const copyLogger = logger;
            copyLogger.foo = () => { console.log('this is a test')};
            expect(logger).to.deep.equal(copyLogger);
            done();
        });
    });

    describe('getAction', () => {
        it('expect to have get_users action', (done) => {
            const validBasePaths = ['/api/v1/users', '/api/v1/users/'];
            Object.keys(validBasePaths).forEach(index => {
                const req = { originalUrl: validBasePaths[index], method: 'GET' };
                expect(logger.getAction(req)).to.be.equal('get_users');
            });
            done();
        });

        it('expect to have get_user action', (done) => {
            const req = { originalUrl: '/api/v1/users/john.doe@suricats-consulting.com', method: 'GET' };
            const action = logger.getAction(req);
            expect(action).to.be.equal('get_user');
            done();
        });

        it('expect to have post_user action', (done) => {
            const validBasePaths = ['/api/v1/users', '/api/v1/users/'];
            Object.keys(validBasePaths).forEach(index => {
                const req = { originalUrl: validBasePaths[index], method: 'POST' };
                expect(logger.getAction(req)).to.be.equal('post_user');
            });
            done();
        });

        it('expect to have an undefined action (post_users don\'t expect to have {username} in its endpoint)', (done) => {
            const req = { originalUrl: '/api/v1/users/john.doe@suricats-consulting.com', method: 'POST' };
            expect(logger.getAction(req)).to.be.undefined;
            done();
        });

        it('expect to have put_user action', (done) => {
            const req = { originalUrl: '/api/v1/users/john.doe@suricats-consulting.com', method: 'PUT' };
            const action = logger.getAction(req);
            expect(action).to.be.equal('put_user');
            done();
        });

        it('expect to have delete_user action', (done) => {
            const req = { originalUrl: '/api/v1/users/john.doe@suricats-consulting.com', method: 'DELETE' };
            const action = logger.getAction(req);
            expect(action).to.be.equal('delete_user');
            done();
        });

        it('expect to have an undefined action (wrong basepaths)', (done) => {
            const invalidBasePaths = ['/api/v1/user', '/foo/v1/users', '/api/v2/users'];
            Object.keys(invalidBasePaths).forEach(index => {
                const req = { originalUrl: invalidBasePaths[index], method: 'GET' };
                expect(logger.getAction(req)).to.be.undefined;
            });
            Object.keys(invalidBasePaths).forEach(index => {
                const req = { originalUrl: invalidBasePaths[index], method: 'POST' };
                expect(logger.getAction(req)).to.be.undefined;
            });
            done();
        });

        it('expect to have an undefined action (the {username} doesn\'t respect mail format)', (done) => {
            const arrMethods = ['GET', 'POST', 'PUT', 'DELETE'];
            Object.keys(arrMethods).forEach(index => {
                const req = { originalUrl: '/api/v1/users/john.doe+suricats-consulting.com', method: arrMethods[index] };
                expect(logger.getAction(req)).to.be.undefined;
            });
            done();
        });
    });    

    describe('loggerInstance', () => {
        it('expect to have bunyan instance', (done) => {
            expect(logger.loggerInstance()).to.be.an.instanceof(require('bunyan'));
            done();
        });

    });
});


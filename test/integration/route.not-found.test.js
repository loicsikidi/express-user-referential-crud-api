process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../app');

describe('Test Not found endpoint', function() {

    it('expect to get a not_found (404) error', function(done) {
        chai.request(server)
        .get('/api/v1/foobar')
        .end(function(err, res) {
            expect(res).to.have.status(404);
            expect(res).to.be.json; // jshint ignore:line
            expect(res.body).to.have.property('code');
            expect(res.body.code).to.equal('not_found');
            expect(res.body).to.have.property('message');
            done();
        });
      });
});
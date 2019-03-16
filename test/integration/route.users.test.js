process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const knex = require('../../db/connnection');
const ref = require('../../lib/referential');
const u = require('../../lib/utils');
const validator = u.openApiValidator();
const server = require('../../app');

const resource = 'users';
const nominalUsername = 'john.doe@suricats-consulting.com';
const nominalFirstName = 'john';
const nominalLastName = 'doe';

describe('USERS API routes', function() {

    beforeEach(function(done) {
      knex.migrate.rollback()
      .then(function() {
        knex.migrate.latest()
        .then(function() {
           knex.seed.run()
          .then(function() {
            done();
          });
        });
      });
    });
  
    afterEach(function(done) {
      knex.migrate.rollback()
      .then(function() {
        done();
      });
    });

    describe('GET /api/v1/users', function() {
        it('expect to get all users', function(done) {
          const validateResponse = validator.validateResponse("get", "/users");
          chai.request(server)
          .get(`/api/v1/${resource}`)
          .end(function(err, res) {
            expect(validateResponse(res)).to.be.undefined;  
            expect(res).to.have.status(200);
            expect(res).to.be.json; // jshint ignore:line
            expect(res.body.limit).to.equal(5);
            expect(res.body.offset).to.equal(0);
            expect(res.body.users.length).to.equal(2);
            expect(res.body.users[0].username).to.equal(nominalUsername);
            expect(res.body.users[0].first_name).to.equal(nominalFirstName);
            expect(res.body.users[0].last_name).to.equal(nominalLastName);
            expect(res.body.users[1].username).to.equal('jane.doe@suricats-consulting.com');
            expect(res.body.users[1].first_name).to.equal('jane');
            expect(res.body.users[1].last_name).to.equal('doe');
            done();
          });
        });

        it('expect to only get the first user thanks to limit filter', function(done) {
            const validateResponse = validator.validateResponse("get", "/users");
            chai.request(server)
            .get(`/api/v1/${resource}`)
            .query({limit: 1})
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;  
              expect(res).to.have.status(200);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.limit).to.equal(1);
              expect(res.body.offset).to.equal(0);
              expect(res.body.users.length).to.equal(1);
              expect(res.body.users[0].username).to.equal(nominalUsername);
              expect(res.body.users[0].first_name).to.equal(nominalFirstName);
              expect(res.body.users[0].last_name).to.equal(nominalLastName);
              done();
            });
        });

        it('expect to only get the second user thanks to offset filter', function(done) {
            const validateResponse = validator.validateResponse("get", "/users");
            chai.request(server)
            .get(`/api/v1/${resource}`)
            .query({offset: 1})
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;  
              expect(res).to.have.status(200);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.limit).to.equal(5);
              expect(res.body.offset).to.equal(1);
              expect(res.body.users.length).to.equal(1);
              expect(res.body.users[0].username).to.equal('jane.doe@suricats-consulting.com');
              expect(res.body.users[0].first_name).to.equal('jane');
              expect(res.body.users[0].last_name).to.equal('doe');
              done();
            });
        });

        it('expect to have a error because offset query param is not an integer', function(done) {
            chai.request(server)
            .get(`/api/v1/${resource}`)
            .query({offset: 'foobar'})
            .end(function(err, res) {
              expect(res).to.have.status(400);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body).to.have.property('code');
              expect(res.body.code).to.equal('bad_request');
              expect(res.body).to.have.property('message');
              done();
            });
        });

        it('expect to have a error because limit query param is not an integer', function(done) {
            chai.request(server)
            .get(`/api/v1/${resource}`)
            .query({limit: 'foobar'})
            .end(function(err, res) {
              expect(res).to.have.status(400);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body).to.have.property('code');
              expect(res.body.code).to.equal('bad_request');
              expect(res.body).to.have.property('message');
              done();
            });
        });
    });

    describe('GET /api/v1/users/<username>', function() {
        it('expect to get a SINGLE user', function(done) {
          const validateResponse = validator.validateResponse("get", "/users/{username}");
          chai.request(server)
          .get(`/api/v1/${resource}/${nominalUsername}`)
          .end(function(err, res) {
            expect(validateResponse(res)).to.be.undefined;  
            expect(res).to.have.status(200);
            expect(res).to.be.json; // jshint ignore:line
            expect(res.body.username).to.equal(nominalUsername);
            expect(res.body.first_name).to.equal(nominalFirstName);
            expect(res.body.last_name).to.equal(nominalLastName);
            done();
          });
        });

        it('expect to have not_found (404) error', function(done) {
            const validateResponse = validator.validateResponse("get", "/users/{username}");
            chai.request(server)
            .get(`/api/v1/${resource}/not.found@suricats-consulting.com`)
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;  
              expect(res).to.have.status(404);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.code).to.equal('not_found');
              done();
            });
        });
    });

    describe('POST /api/v1/users', function() {
        it('expect to post succefully a new user', function(done) {
          const validateResponse = validator.validateResponse("post", "/users");
          const newUser = {
            username: 'new.user@suricats-consulting.com',
            first_name: 'new',
            last_name: 'user',
            status: ref.STATUS_INTERN_CODE
          };
          chai.request(server)
          .post(`/api/v1/${resource}`)
          .send(newUser)
          .end(function(err, res) {
            expect(validateResponse(res)).to.be.undefined;  
            expect(res).to.have.status(201);
            expect(res.headers).to.have.property('location');
            done();
          });
        });

        it('expect to have a conflict (409) error', function(done) {
            const validateResponse = validator.validateResponse("post", "/users");
            const newUser = {
              username: 'new.user@suricats-consulting.com',
              first_name: 'new',
              last_name: 'user',
              status: ref.STATUS_INTERN_CODE
            };
            chai.request(server)
            .post(`/api/v1/${resource}`)
            .send(newUser)
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;  
              expect(res).to.have.status(201);
              expect(res.headers).to.have.property('location');
              chai.request(server)
              .post(`/api/v1/${resource}`)
              .send(newUser)
              .end(function(err2, res2) {
                expect(validateResponse(res2)).to.be.undefined;
                expect(res2).to.have.status(409);
                expect(res2).to.be.json; // jshint ignore:line
                expect(res2.body.code).to.equal('conflict');
                done();
              });
              
            });
        });

        it('expect to have a bad_request (400) error', function(done) {
            const validateResponse = validator.validateResponse("post", "/users");
            const newUser = {
              username: 'new.user@suricats-consulting.com',
              first_name: 'new',
              last_name: 'user',
              status: 'WRONG_STATUS'
            };
            chai.request(server)
            .post(`/api/v1/${resource}`)
            .send(newUser)
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;  
              expect(res).to.have.status(400);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.code).to.equal('bad_request');
              done();
            });
        });
    });

    describe('PUT /api/v1/users/<username>', function() {
        it('expect to update succefully a user', function(done) {
          const validateResponse = validator.validateResponse("put", "/users/{username}");
          const updateUser = {
            first_name: nominalFirstName,
            last_name: nominalLastName,
            status: ref.STATUS_INTERN_CODE,
            start_date: null,
            end_date: null,
            phone: '0691923042'
          };
          chai.request(server)
          .put(`/api/v1/${resource}/${nominalUsername}`)
          .send(updateUser)
          .end(function(err, res) {
            expect(validateResponse(res)).to.be.undefined;  
            expect(res).to.have.status(200);
            expect(res).to.be.json; // jshint ignore:line
            expect(res.body.username).to.equal(nominalUsername);
            expect(res.body.first_name).to.equal(nominalFirstName);
            expect(res.body.last_name).to.equal(nominalLastName);
            done();
          });
        });

        it('expect to have a not_found (404) error', function(done) {
            const validateResponse = validator.validateResponse("put", "/users/{username}");
            const updateUser = {
                first_name: nominalFirstName,
                last_name: nominalLastName,
                status: ref.STATUS_INTERN_CODE,
                start_date: null,
                end_date: null,
                phone: '0691923042'
            };
            chai.request(server)
            .put(`/api/v1/${resource}/not.found@suricats-consulting.com`)
            .send(updateUser)
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;
              expect(res).to.have.status(404);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.code).to.equal('not_found');
              done();              
            });
        });

        it('expect to have a bad_request (400) error', function(done) {
            const validateResponse = validator.validateResponse("put", "/users/{username}");
            const updateUser = {
                first_name: null,
                last_name: null,
                status: ref.STATUS_INTERN_CODE,
                start_date: null,
                end_date: null,
                phone: null
            };
            chai.request(server)
            .put(`/api/v1/${resource}/${nominalUsername}`)
            .send(updateUser)
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;
              expect(res).to.have.status(400);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.code).to.equal('bad_request');
              done();              
            });
        });
    });

    describe('DELETE /api/v1/users/<username>', function() {
        it('expect to delete a SINGLE user', function(done) {
          const validateResponse = validator.validateResponse("delete", "/users/{username}");
          chai.request(server)
          .delete(`/api/v1/${resource}/${nominalUsername}`)
          .end(function(err, res) {
            expect(validateResponse(res)).to.be.undefined;  
            expect(res).to.have.status(204);
            done();
          });
        });

        it('expect to have not_found (404) error', function(done) {
            const validateResponse = validator.validateResponse("delete", "/users/{username}");
            chai.request(server)
            .delete(`/api/v1/${resource}/not.found@suricats-consulting.com`)
            .end(function(err, res) {
              expect(validateResponse(res)).to.be.undefined;  
              expect(res).to.have.status(404);
              expect(res).to.be.json; // jshint ignore:line
              expect(res.body.code).to.equal('not_found');
              done();
            });
        });
    });

});
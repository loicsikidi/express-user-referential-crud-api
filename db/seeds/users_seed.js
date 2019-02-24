const u = require('../../lib/utils');
const ref = require('../../lib/referential');
const faker = require('faker');

var statusesResponse = [];

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    return knex("statuses").del();
  })
  .then(() => {
    const statuses = [ 
      {title: ref.STATUS_INTERN_CODE},
      {title: ref.STATUS_SERVICE_PROVIDER_CODE},
      {title: ref.STATUS_TRAINEE_CODE}
    ];
    return knex("statuses").insert(statuses);
  })
  .then(() => {
    return knex('statuses').pluck('id');
  })
  .then((statusesId) => {
    statusesResponse = statusesId;
    let username = 'john.doe@suricats-consulting.com';
    let first_name = 'john';
    let last_name = 'doe';
    return Promise.join(
      knex('users').insert({
        id: u.emailToUuid(username),
        username: username,
        first_name: first_name,
        last_name: last_name,
        status_id: faker.random.arrayElement(statusesResponse)
      })
    )
  })
  .then(() => {
    let username = 'jane.doe@suricats-consulting.com';
    let first_name = 'jane';
    let last_name = 'doe';
    return Promise.join(
      knex('users').insert({
        id: u.emailToUuid(username),
        username: username,
        first_name: first_name,
        last_name: last_name,
        status_id: faker.random.arrayElement(statusesResponse)
      })
    )
  });
};
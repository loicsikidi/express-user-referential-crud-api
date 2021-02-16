const u = require('../../../lib/utils');
const ref = require('../../../lib/referential');
const faker = require('faker');

exports.seed = async (knex, Promise) => {
  const countStatuses = await knex("statuses").count('id');
  if(parseInt(countStatuses[0].count) === 0){
    await knex("users").del();
    const statuses = [ 
      {title: ref.STATUS_INTERN_CODE},
      {title: ref.STATUS_SERVICE_PROVIDER_CODE},
      {title: ref.STATUS_TRAINEE_CODE}
    ];
    await knex("statuses").insert(statuses);
    const statusesResponse = await knex('statuses').pluck('id');
    let username = 'john.doe@kiwi-corporation.com';
    let first_name = 'john';
    let last_name = 'doe';
    await knex('users').insert({
        id: u.emailToUuid(username),
        username: username,
        first_name: first_name,
        last_name: last_name,
        status_id: faker.random.arrayElement(statusesResponse)
    });
    username = 'jane.doe@kiwi-corporation.com';
    first_name = 'jane';
    await knex('users').insert({
      id: u.emailToUuid(username),
      username: username,
      first_name: first_name,
      last_name: last_name,
      status_id: faker.random.arrayElement(statusesResponse)
    })
  }
};
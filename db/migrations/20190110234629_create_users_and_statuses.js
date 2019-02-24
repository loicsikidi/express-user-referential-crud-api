const u = require('../../lib/utils');

exports.up = (knex, Promise) => {
    return knex.raw('create extension if not exists "uuid-ossp"')
    .then(() => {
      return knex.schema
      .createTable('statuses', (table) => {
        table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('title').unique().notNullable();
      })
      .createTable('users', (table) => {
        const now = knex.raw('now()');
        table.uuid('id').primary().unique().notNullable();
        table.string('username').unique().notNullable();
        table.string('first_name').notNullable().defaultTo(null);
        table.string('last_name').notNullable().defaultTo(null);
        table.timestamp('start_date').defaultTo(null);
        table.timestamp('end_date').defaultTo(null);
        table.timestamp('updated_at').notNullable().defaultTo(now);
        table.timestamp('created_at').notNullable().defaultTo(now);
        table.uuid('status_id').unsigned().notNullable();
        table.foreign('status_id').references('statuses.id');
        table.string('phone');
        /** ATTRIBUTS A AJOUTER DANS UN FUTUR PROCHE :) **/
        // table.string('password').notNullable();
        // table.boolean('admin').notNullable().defaultTo(false);
      })
    })
};
  
exports.down = (knex, Promise) => {
  return knex.schema
  .dropTable('statuses')
  .dropTable('users')
  .then(() => {
    return knex.raw('drop extension if exists "uuid-ossp"')
  });
};
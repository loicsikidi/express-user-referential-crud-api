const knex = require('../db/connnection');
const moment = require('moment');
const { OPENAPI_DEFAULT_QUERY_PARAM } = require('../lib/referential');
const u = require('../lib/utils');

const getUserScope = ['username', 'first_name', 'last_name', 'start_date', 'end_date', 'updated_at', 'created_at', 'phone', {status: 'title'}];
//TODO: Get ride of these arrays. It would be more relevant to make this check thanks to the openapi file (cf. create custom middleware)
const postUserScope = ['id', 'username', 'first_name', 'last_name', 'start_date', 'end_date', 'phone', 'status_id'];
const putUserScope = ['first_name', 'last_name', 'start_date', 'end_date', 'updated_at', 'phone', 'status_id'];


function getAllUsers(limit = OPENAPI_DEFAULT_QUERY_PARAM.getParam('limit'), offset = OPENAPI_DEFAULT_QUERY_PARAM.getParam('offset')) {
  if(!Number.isInteger(limit) || !Number.isInteger(offset)){
    throw new Error('limit or/and offset parameters are not interger');
  }
  return knex('users')
  .select(getUserScope)
  .join('statuses', {'statuses.id': 'users.status_id'})
  .limit(limit)
  .offset(offset);
}

function countAllUsers() {
    return knex('users')
    .count('id');
}

function getUserByEmail(email) {
    return knex('users')
    .select(getUserScope)
    .join('statuses', {'statuses.id': 'users.status_id'})
    .where('username', email)
    .first();
}

function getUserById(id) {
    return knex('users')
    .select(getUserScope)
    .where('id', id)
    .first();
}

function addUser(user) {
    user.id = u.emailToUuid(user.username);
    return knex('users')
    .insert(u.cleanRessource(user, postUserScope))
    .returning('*');
}

function updateUser(email, user) {
    user.updated_at = moment().format();
    return knex('users')
    .where('username', email)
    .update(u.cleanRessource(user, putUserScope))
    .returning('*');
}

function deleteUser(email) {
    return knex('users')
    .where('username', email)
    .del()
    .returning('*');
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    countAllUsers
};
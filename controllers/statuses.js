const knex = require('../db/connnection');

function getStatusByName(statusName) {
    const title = statusName.toLowerCase();
    return knex('statuses')
    .select('id')
    .where('title', title)
    .first();
}

module.exports = {
    getStatusByName
}
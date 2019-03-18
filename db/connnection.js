const environment = require('../lib/configuration').ENV;
const path = require('path');
const BASE_PATH = path.resolve(".");

const config = require(BASE_PATH + '/knexfile.js')[environment];
module.exports = require('knex')(config);
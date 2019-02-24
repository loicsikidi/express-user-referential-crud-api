const environment = process.env.NODE_ENV;
const path = require('path');
const BASE_PATH = path.dirname(require.main.filename);
const config = require(BASE_PATH + '/knexfile.js')[environment];
module.exports = require('knex')(config);
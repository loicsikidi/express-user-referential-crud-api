const {DATABASE_TYPE, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_HOSTNAME} = require("./lib/configuration");

module.exports = {
    development: {
      client: DATABASE_TYPE,
      connection: { user:DATABASE_USERNAME, password:DATABASE_PASSWORD, database:DATABASE_NAME, host:DATABASE_HOSTNAME},
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds/development'
      }
    },
    test: {
      client: DATABASE_TYPE,
      connection: { user:DATABASE_USERNAME, password:DATABASE_PASSWORD, database:DATABASE_NAME, host:DATABASE_HOSTNAME},
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds'
      }
    },
    production: {
      client: DATABASE_TYPE,
      connection: { user:DATABASE_USERNAME, password:DATABASE_PASSWORD, database:DATABASE_NAME, host:DATABASE_HOSTNAME},
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds/production'
      }
    }
};
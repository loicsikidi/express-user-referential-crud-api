const configuration = require("./lib/configuration");

module.exports = {
    development: {
      client: configuration.DATABASE_TYPE,
      connection: { user:configuration.DATABASE_USERNAME, password:configuration.DATABASE_PASSWORD, database:configuration.DATABASE_NAME, host:configuration.DATABASE_HOSTNAME},
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds'
      }
    },
    test: {
      client: configuration.DATABASE_TYPE,
      connection: { user:configuration.DATABASE_USERNAME, password:configuration.DATABASE_PASSWORD, database:configuration.DATABASE_NAME, host:configuration.DATABASE_HOSTNAME},
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds'
      }
    },
    production: {
      client: configuration.DATABASE_TYPE,
      connection: { user:configuration.DATABASE_USERNAME, password:configuration.DATABASE_PASSWORD, database:configuration.DATABASE_NAME, host:configuration.DATABASE_HOSTNAME},
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds'
      }
    }
};
const dotenv = require('dotenv').config();

/**
 * All environment variables are accessible through this object
 * With this pattern are able to set default values and throw error if there are missing structural data.
 */
const configuration = {
    ENV:               process.env.NODE_ENV,
    PORT:              process.env.PORT || 8080,
    DATABASE_TYPE:     process.env.DATABASE_TYPE  || 'postgresql',
    DATABASE_NAME:     process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOSTNAME: process.env.DATABASE_HOSTNAME || 'localhost' 
};

module.exports =  Object.freeze(configuration);
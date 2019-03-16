const { OpenapiParameterList, OpenapiParameter } = require('./openapi_parameter');

const openapiList = new OpenapiParameterList(new OpenapiParameter('limit', 5), new OpenapiParameter('offset'));

/**
 * List all constants used in this project
 */
const referential = {
    OPENAPI_DEFAULT_QUERY_PARAM: openapiList,
    STATUS_INTERN_CODE: 'intern',
    STATUS_TRAINEE_CODE: 'trainee',
    STATUS_SERVICE_PROVIDER_CODE: 'service_provider',
    DB_ERRORS: {
        postgresql: {
            DUPLICATE_KEY: '23505'
        }
    }
}

module.exports = Object.freeze(referential);
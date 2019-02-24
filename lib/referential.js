class OpenapiParameterList {

    constructor(...parameters){
        this.params = [];
        Object.keys(parameters).forEach(function(key) {
            this.params.push(parameters[key]);
        }, this);
    }

    add(parameter){
        this.params.push(parameter);
    }

    getParam(parameterName){
        let param = null;
        Object.keys(this.params).forEach(function(key) {
            if(parameterName === this.params[key].name){
                param = this.params[key];
            }
        }, this);
        return param;
    }

    toArray(){
        let params = []
        Object.keys(this.params).forEach(function(key) {
            params.push(this.params[key].toObject())
        }, this);
        return params;
    }
}

class OpenapiParameter {

    constructor(name, default_value = 0, type = "integer", scope = "query"){
        this.name = name;    
        this.type = type;
        this.default_value = default_value;
        this.scope = scope
    }

    toObject () {
        return {
            in: this.scope,
            type: this.type,
            name: this.name,
            default: this.default_value
        }
    }
}

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
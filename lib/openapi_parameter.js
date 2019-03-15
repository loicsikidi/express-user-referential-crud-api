const { InternalError } = require("./errors");

class OpenapiParameterList {

    constructor(...parameters){
        this.params = [];
        Object.keys(parameters).forEach(function(key) {
            if(parameters[key].constructor !== OpenapiParameter)
                throw new InternalError(`Illegal argument`);    
            this.params.push(parameters[key]);
        }, this);
    }

    setParam(parameter){
        if(parameter.constructor !== OpenapiParameter)
            throw new InternalError(`Illegal argument`);
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

module.exports = {OpenapiParameterList, OpenapiParameter};
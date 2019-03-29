const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const path = require("path");
const absolutePath = path.resolve("api/openapi.yaml");
const fs = require("fs");
const { OpenApiValidator } = require("express-openapi-validate");
const jsYaml = require("js-yaml");
const { InternalError } = require("./errors");

const u = {
    randomUuid() {
        return uuidv4();
    },
    md5(value) {
        if(!value)
            throw new InternalError(`Illegal argument`);
        return md5(value);
    },
    emailToUuid(email) {
        if(!email)
            throw new InternalError(`Illegal argument`);
        return uuidv5(email, this.md5(email));
    },
    openApiValidator() {
        const openApiDocument = jsYaml.safeLoad(
            fs.readFileSync(absolutePath, "utf-8")
        );
        return new OpenApiValidator(openApiDocument, {ajvOptions: { coerceTypes: true }});
    },
    mapToCollectionStructure(limit, offset, count, collectionName, collection){
        return {
            count: count,
            [collectionName]: collection,
            limit: limit,
            offset: offset
        }
    },
    cleanRessource(resource = {}, scope = [], includeStrategy = true){
        let obj = {};
        if(includeStrategy){
            const resourceKeys = Object.keys(resource);
            Object.keys(scope).forEach((key) => {
                if(resourceKeys.includes(scope[key])){
                    obj[scope[key]] = resource[scope[key]];
                }
            });
        }else{
            Object.keys(resource).forEach((key) => {
                if(!scope.includes(resource[key])){
                    obj[key] = resource[key];
                }
            });
        }
        return obj;
    },
    isSuccessStatusCode(res) {
        return 200 <= res.statusCode && res.statusCode < 300;
    },
    getCleanErr(err) {
        if(err.stack && err.stack.indexOf('knex') !== -1){
            err.name = 'internal_error';
            err.message = 'An error occurs in the database';
            err.data = err.stack;
            let maxSize = 200;
            if(err.data.length > maxSize){
                err.data = err.data.substring(0, maxSize) + ' [truncated...]';
            }
        }
        return err;
    }
}

module.exports = Object.freeze(u);
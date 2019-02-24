const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const path = require("path");
const absolutePath = path.resolve("api/openapi.yaml");
const fs = require("fs");
const { OpenApiValidator } = require("express-openapi-validate");
const jsYaml = require("js-yaml");

const u = {
    randomUuid() {
        return uuidv4();
    },
    md5(value) {
        return md5(value);
    },
    emailToUuid(email) {
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
    cleanRessource(resource = {}, scope = []){
        let obj = {};
        const resourceKeys = Object.keys(resource);
        Object.keys(scope).forEach((key) => {
            if(resourceKeys.includes(scope[key])){
                obj[scope[key]] = resource[scope[key]];
            }
        });
        return obj;
    }
}

module.exports = Object.freeze(u);
const tmpdir = require('os').tmpdir();
const bunyan = require('bunyan');

const logger = {
    loggerInstance(correlationId) {
        return bunyan.createLogger({
            name: 'user-ref-crud-api',
            correlationId: correlationId,
            serializers: {
                req: bunyan.stdSerializers.req,
                res: bunyan.stdSerializers.res,
                err: bunyan.stdSerializers.err
            },
            streams: [{
                type: 'rotating-file',
                path: tmpdir + '/app.log',
                period: '1d',   // daily rotation
                count: 10       // keep 10 back copies
            },{
                stream: process.stdout,
                level: "info"
            },{
                stream: process.stderr,
                level: "error"
            }]
        })
    },
    getAction (req) {
        let action;
        if(req.originalUrl.match(/^(\/api\/v1\/users)(\/)?(\/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))?$/g)){
            switch (req.method) {
              case 'GET':    action = req.originalUrl.match(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g) ?  "get_user" : "get_users"; break;
              case 'PUT':    action = "put_user"; break;
              case 'POST':   action = "post_user"; break;
              case 'DELETE': action = "delete_user"; break;
            }
        }
        return action;  
    }
}

module.exports = Object.freeze(logger);
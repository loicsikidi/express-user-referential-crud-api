const app = require('express')();
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id')();

const users = require('./routes/users');
const ref = require('./lib/referential');
const {isSuccessStatusCode} = require('./lib/utils');
const configuration = require('./lib/configuration');
const logger = require('./logger');
const { NotFoundError } = require('./lib/errors');

//TODO: get rid of this implementation... get default value directly from the yaml
const setDefaultQueryParamValues = require('express-openapi-defaults')({
  parameters: ref.OPENAPI_DEFAULT_QUERY_PARAM.toArray()
});

app.use(bodyParser.json());
app.use(setDefaultQueryParamValues);
app.use(addRequestId);

app.use(preLoggingMiddleware);

app.use((req, res, next) => {
  function afterResponse() {
      res.removeListener('finish', afterResponse);
      res.removeListener('close', afterResponse);
      const logMessage = {
        res:res,
        action: logger.getAction(req),
        eventType: isSuccessStatusCode(res) ? 'success' : 'failed',
        category: "endpoint"
      }
      req.logger.info(logMessage, 'response');
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});

app.use('/api/v1/users', users);

/**
 * 
 *  ERROR HANDLERS
 * 
 * */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new NotFoundError('Route does not exist');
    next(err);
});

app.use((err, req, res, next) => {
  req.logger.error({err, err}, 'error catched in error middleware');
  // handle the exception throws by express-openapi-validate module 
  if(err.statusCode == 400){
    err.name = "bad_request";
  }
  response = {
    code: err.name,
    message: err.message
  }
  if(app.get('env') !== "production"){
    response.data = err.data
  }
  res.status(err.statusCode || err.status || 500);
  res.json(response);
});

app.listen(configuration.PORT);

function preLoggingMiddleware(req, res, next){
  req.logger = logger.loggerInstance(req.id);
  req.logger.info({req: req}, 'request');
  req.logger.info({action: logger.getAction(req), category: "endpoint"}, 'start of the process');
  next();
}

module.exports = app;
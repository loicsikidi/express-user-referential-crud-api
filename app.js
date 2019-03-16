const dotenv = require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const ref = require('./lib/referential');
const { NotFoundError } = require('./lib/errors');

//TODO: get rid of this implementation... get default value directly from the yaml
const setDefaultQueryParamValues = require('express-openapi-defaults')({
  parameters: ref.OPENAPI_DEFAULT_QUERY_PARAM.toArray()
});

const app = express();

if (process.env.NODE_ENV !== 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(setDefaultQueryParamValues);

app.use('/api/v1/users', users);

/**
 * 
 *  ERROR HANDLERS
 * 
 * */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new NotFoundError('Route does not exist');
    next(err);
});

app.use(function(err, req, res, next) {
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

app.listen(process.env.PORT);

module.exports = app;
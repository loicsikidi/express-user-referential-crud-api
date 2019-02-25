const dotenv = require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const ref = require('./lib/referential');

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
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {;
    res.status(err.statusCode || err.status || 500);
    res.json({
        name: err.name,
        message: err.message,
        data: err.data
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT);

module.exports = app;
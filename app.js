const createError = require('http-errors');
const express = require('express');
const compression = require("compression");
require('dotenv').config()
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const helmet = require('helmet')
const RateLimit = require("express-rate-limit");


const app = express();


const mongoose = require('mongoose')

// const mongo_uri = "mongodb://localhost:27017/inventory"
const mongoDB = process.env.MONGODB_URI || dev_db_url;

// const mongo_uri = 'mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.rzbvdyu.mongodb.net/inventory' 
async function main() {
  await mongoose.connect(mongoDB);
}
// connect to atlas
main().catch((err) => console.log(err));


app.use(compression());
// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventory');

app.use('/', inventoryRouter);
app.use('/inventory', inventoryRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

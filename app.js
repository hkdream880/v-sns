const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
require('dotenv').config();
const { sequelize } = require('./server/models');
const passport = require('passport');
const passportConfig = require('./server/passport')
const indexRouter = require('./server/routes/index');
const apiRouter = require('./server/routes/v1');


const app = express();
sequelize.sync();
passportConfig(passport);

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false, //최초 접속 할 때 로그인 하지 않더라도 세션 발행
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60*60*1000,
  }
})
// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/v1',apiRouter);


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

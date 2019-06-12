const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false, //최초 접속 할 때 로그인 하지 않더라도 세션 발행 
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60*60*1000,
  },
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    logErrors: true,
  })
});

module.exports = sessionMiddleware;
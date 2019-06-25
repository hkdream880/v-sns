const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const sessionOption = {
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
};

if(process.env.NODE_ENV==='production'){
  //sessionOption.proxy = true; //proxy 서버 사용 할 경우
  //sessionOption.cookie.secure = true; //https 
}
const sessionMiddleware = session(sessionOption);

module.exports = sessionMiddleware;
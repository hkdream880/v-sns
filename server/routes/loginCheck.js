//login 여부 확인을 위한 미들 웨어
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  try {
    console.log('exports.isLoggedIn test')
    console.log(req.headers.authorization);
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    //jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    if(req.isAuthenticated()){
      next();
    } else {
      res.status(500).json({
        code: 500,
        data: '로그인이 필요합니다.'
      });
    } 
  } catch (error) {
    console.log('loggin check token error');
    console.error(error)
    res.status(500).json({
      code: 500,
      data: '토큰이 만료되었습니다. 다시 로그인 해주세요.'
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  try {
    if(!req.isAuthenticated()){
      return next();
    }
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    res.status(500).json({
      code: 500,
      data: '로그아웃 해 주세요.'
    });
  } catch (error) {
    next();
  }
};
//login 여부 확인을 위한 미들 웨어
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return req.isAuthenticated();
  } catch (error) {
    console.log('isLoggedIn catch called');
    return false;
  }
};
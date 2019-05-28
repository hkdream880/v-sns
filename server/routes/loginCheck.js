//login 여부 확인을 위한 미들 웨어
exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  }else{
    res.status(500).json({
      code: 500,
      data: 'need login'
    })
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    next();
  }else{
    res.status(500).json({
      code: 500,
      data: 'already logined'
    })
  }
};
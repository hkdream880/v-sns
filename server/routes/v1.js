const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('./loginCheck');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/login-check',(req, res, next)=>{
  const result = isLoggedIn(req);
  res.status(200).json({
    code: 200,
    data: {
      result
    }
  })
})

router.post('/join', async (req, res, next )=>{
  let returnObj = {
    code: null,
    data: null,
  }
  try {
    if(isLoggedIn(req)){
      return res.status(500).json({
        code: 500,
        data: {
          message: '이미 로그인 하였습니다.'
        }
      })
    }
    const duplicateUser = await User.findAll({where: { email: req.body.email,deletedAt: null}})
    if(duplicateUser.length<=0){
      const hashPassword = await bcrypt.hash(req.body.password,10);
      await User.create({
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
      })
      returnObj.code = 201;
      returnObj.data = {
        message: 'success'
      };
    }else{
      returnObj.code = 500;
      returnObj.data = '이미 가입된 회원입니다.';
    }
    return res.status(returnObj.code).json(returnObj);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login',(req,res,next)=>{
  let returnObj = {
    code: null,
    data: null,
  }
  if(isLoggedIn(req)){
    returnObj.code = 500;
    returnObj.data = {
      message: '이미 로그인 하였습니다.'
    };
    return res.status(returnObj.code).json(returnObj);
  }
  passport.authenticate('local',(authError, user, info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      returnObj.code = 500;
      returnObj.data = info.message;
      return res.status(returnObj.code).json(returnObj.data);
    }
    return req.login(user, (loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      returnObj.code = 201;
      returnObj.data = 'login success';
      returnObj.token = jwt.sign({
        email: user.email
      },process.env.JWT_SECRET,{
        expiresIn: '1h',
        issuer: 'v-sns'
      });
      return res.status(returnObj.code).json(returnObj);
    });
  })(req, res, next);
});

module.exports = router;
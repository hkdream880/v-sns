const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
const passport = require('passport');
let returnObj = {
  code: null,
  data: null,
}

router.post('/join',isNotLoggedIn, async (req, res, next )=>{
  try {
    const duplicateUser = await User.findAll({where: { email: req.body.email,deletedAt: null}})
    
    if(duplicateUser.length<=0){
      const hashPassword = await bcrypt.hash(req.body.password,10);
      await User.create({
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
      })
      returnObj.code = 201;
      returnObj.data = 'success';
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

router.post('/login',isNotLoggedIn,(req,res,next)=>{
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
      //return res.redirect('/');
      return res.status(returnObj.code).json(returnObj);
    });
  })(req, res, next);
});

module.exports = router;
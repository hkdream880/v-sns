const express = require('express');
const router = express.Router();
const path = require('path');
const { User, Contents, HashTag, Replies } = require('../models');
const queryOption = require('sequelize').Op;
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/')
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    }
  }),
  limits: {fieldSize : 5 * 1024 * 1024 }  //5mb 로 용량 제한
});

fs.readdir('uploads',(error)=>{
  if(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

router.get('/login-check',isLoggedIn,(req, res, next)=>{
  res.status(200).json({
    code: 200,
    data: {
      info: {
        email: req.user.email,
        phone: req.user.phone,
        profile: req.user.profile,
      }
    }
  });
});

router.post('/join',isNotLoggedIn, async (req, res, next )=>{
  let returnObj = {
    code: null,
    data: null,
  };
  try {
    const duplicateUser = await User.findAll({where: { email: req.body.email,deletedAt: null}})
    if(duplicateUser.length<=0){
      const hashPassword = await bcrypt.hash(req.body.password,10);
      await User.create({
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
      });
      returnObj.code = 201;
      returnObj.data = {
        message: 'success',
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

router.post('/login',isNotLoggedIn,(req,res,next)=>{
  let returnObj = {
    code: null,
    data: null,
  };
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
      returnObj.info = {
        email: req.user.email,
        phone: req.user.phone,
        profile: req.user.profile,
      };
      return res.status(returnObj.code).json(returnObj);
    });
  })(req, res, next);
});

router.post('/write',isLoggedIn,upload.single('image'),async (req, res, next)=>{
  /*
    tag 업을경우 contents 만 입력
    tag 있을경우 tag, tagContents 입력
  */
 try {
  let snsObj = {
    content: req.body.content,
    userId: req.user.id
  };
  if(req.file){
    snsObj.image = req.file.filename;
  }
  const content = await Contents.create(snsObj);

  if(req.body.hashTag){ //tag 있을경우
    const tagArr = req.body.hashTag.split(',')
    //태그 찾아서 없을 경우 생성
    const tagResult = await Promise.all(tagArr.map(tag=>HashTag.findOrCreate({
      where : { name : tag.toLowerCase()}
    })));
    
    //태그와 컨텐츠 연결
    //** 다대다 관계일 때 add + '대상 테이블 이름'() 호출 하면 중간 연결 테이블에 값 생성 된다.
    //await content.addHashtags(tagResult.map(r => r[0]));
    await tagResult.forEach((data)=>{
      content.addHashtags(data[0]);
    })
  }
  res.status(200).json({
    code: 200,
    data: content,
  });
 } catch (error) {
   console.error(error);
   next(error);
 }
})

router.get('/contents',isLoggedIn,async (req, res, next)=>{
  try {
    const userFollowInfo = await User.findOne({
      include: [{
        model: User,
        as: 'Followings',
        attributes:['id']
      }],
      attributes:['id'],
      where: {id: req.user.id}
    });

    let idList = [];
    userFollowInfo.Followings.forEach((data)=>{
      idList.push(data.id);
    })
    idList.push(req.user.id);
    
    const result = await Contents.findAll({
      where: {userId: {[queryOption.in]: idList}},
      include: [
        { model: User,attributes:['email','id','profile']},
        { model: Replies, include: {model: User,attributes:['email','id','profile']}},
      ],
      order:[['createdAt','DESC']],
      reqUserId: req.user.id
    });
    return res.status(200).json({
      code: 200,
      data: result,
      reqUser: req.user.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      data: error
    });
  }
});
router.post('/reply',isLoggedIn,async (req, res, next)=>{
  try {
    console.log('/reply called !!!!!!!!!!',req.body);
    const result = await Replies.create({
      reply: req.body.reply,
      contentId: req.body.contentId,
      userId: req.user.id
    });
    return res.status(200).json({
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      data: error
    });
  }
});

router.get('/find-user',isLoggedIn, async (req, res, next)=>{
  try {
    const findList = await User.findAll(
      { 
        where: { email:{ [queryOption.like]: '%'+req.query.email+'%' }, id:{[queryOption.ne]: req.user.id } },
        attributes: ['id','email']
      }
    );
    return res.status(200).json({
      code:200,
      data: {
        param: req.query,
        list: findList
      },
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      data: 'something wrong'
    })
  }
});

router.post('/add-follow',isLoggedIn,async (req, res, next)=>{
  try {
   const user = await User.findOne({where : {id:req.user.id}});
   const result = await user.addFollowing(req.body.addId);
    return res.status(200).json({
      code: 200,
      data: 'test',
      param: req.body,
      result: result
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      data: 'something wrong',
      result: result
    })
  }
});

router.get('/follow',isLoggedIn, async (req, res, next)=>{
  try {
    const userFollowInfo = await User.findOne({
      include: [{
        model: User,
        as: 'Followings',
        attributes:['id','email','profile']
      }],
      attributes:['id'],
      where: {id: req.user.id}
    }); 
    return res.status(200).json({
      code: 200,
      data: userFollowInfo.Followings,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      data: 'something wrong',
      result: result
    })
  }
})

module.exports = router;
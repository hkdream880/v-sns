var global = {
  authorizationToken : null,
  loginState : false,
  vm : null,
  userInfo: null,
  getHeader : function(headerObj){
    if(!headerObj){
      headerObj = {};
    }
    headerObj.authorization = commonUtil.getInstance().getSessionStorage('authorizationToken');
    return headerObj;
  }
}
var request = function(method, url, param, success, fail, option){
  global.axiosInstance.defaults.headers.common['authorization'] = commonUtil.getInstance().getSessionStorage('authorizationToken');
  if(method==='get'){
    param = {
      params: param
    }
  }
  global.axiosInstance[method](url, param)
    .then($.proxy(function(res){
      if(success){
        success(res.data);
      }      
    },this))
    .catch($.proxy(function(err){
      if(fail){
        fail(err);
      }else{
        console.error(err)
      }
    },this));
}
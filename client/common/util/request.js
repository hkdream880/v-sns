var request = function(method, url, param){
  global.axiosInstance.defaults.headers.common['authorization'] = commonUtil.getInstance().getSessionStorage('authorizationToken');
  return global.axiosInstance[method](url, param);
}
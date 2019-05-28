var request = function(method, url, param, headers){
  //axios.post(URL, data, config).then(...)
  if(!headers){
      headers =  {
        authorization : global.authorizationToken,
      }
  }
  
  return axios[method](url, param, {headers : headers});
}
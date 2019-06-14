global.request = function(method, url, param, header,success, fail, option){
  //global.axiosInstance.defaults.headers.common['authorization'] = commonUtil.getInstance().getSessionStorage('authorizationToken');
  var headers = null;
  var axiocConfig = {
    url: url,
    headers: global.getHeader(header),
    method: method
  };
  if(method==='get'){
    axiocConfig.params = param;
  }else{
    axiocConfig.data = param;
  }
  console.log(axiocConfig);
  axios(axiocConfig)
    .then(function(res){
      if(res.data.code===203){
        return commonUtil.getInstance().showAlert(res.data.data,res.data.code);
      }
      if(success){
        success(res.data);
      }
    })
    .catch(function(err){
      //commonUtil.getInstance().showAlert(err.response.data.data,err.response.data.code);
      if(fail){
        fail(err.response.data);
      }else{
        commonUtil.getInstance().showAlert(err.response.data.data,err.response.data.code);
        console.error(err);
      }
    });
}



/*

export function requestMultipartJsonObject (requestObj) {
  // _.merge - Lodash 라이브러리
  let reqHeaders = store.state.api.common // 공통적으로 사용하는 헤더정보
  _.merge(reqHeaders, requestObj.headers) // 요청 시 설정한 헤더 override
  _.merge(reqHeaders, { 'enctype': 'multipart/form-data' }) // 헤더에 multipart 추가
 
  const formData = new FormData()
 
  // data JsonObject 처리
  formData.append('jsonData', JSON.stringify(requestObj.data))
 
  // files 처리
  // requestObj.files - (file type)HTMLInputElement 배열
  if (requestObj.files) {
    requestObj.files
      .filter((file) => file.name && file.file) // 파일선택되지 않은 Input Element제외
      .forEach((file) => formData.append(file.name, file.file))
  }
 
  return axios({
    url: requestObj.url,
    headers: reqHeaders,
    method: 'post',
    data: formData
  }).then(res => {
    requestObj.callback(res.data)
  }).catch(res => {
    // status 200이 아닌경우에도 응답값을 전달 (각 프로젝트에 맞게 수정필요)
    requestObj.callback(res.response.data)
  })
}

*/
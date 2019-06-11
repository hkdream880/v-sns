var commonUtil = (function() {
  var _instance;
  var _isLogin = function(callback,fail){
    console.log('_isLogin check called');
    //var request = function(method, url, param, header,success, fail, option){
    request('get','/v1/login-check',null,null,
    function(res){
      console.log('login check res',res.data.result);
      global.loginState = res.data.result;
      if(callback){
        callback(res);
      }
    },function(err){
      if(fail){
        global.loginState = false;
        fail();
      }
    });
  };
  
  var _setCookie = function(key, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = key + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  };

  var _getCookie = function(key) {
    var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value? value[2] : null;
  };

  var _deleteCookie = function(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  var _setSessionStorage = function(key, value){
    console.log('_setSessionStorage');
    sessionStorage.setItem(key, value);
  }
  var _getSessionStorage = function(key){
    return sessionStorage.getItem(key);
  }
  var _deleteSessionStorage = function(key){
    storage.removeItem(key);
  }
  var _alertTimeout = null;
  var _showAlert = function(msg,strongMsg){
    clearTimeout(_alertTimeout);
    _hideAlert();
    var alertTemplate = `<div class="alert alert-warning alert-dismissible fade show v-common-alert" role="alert">
      <strong>${strongMsg?strongMsg:'' }</strong>${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    $('#alert_area').html(alertTemplate);
    _alertTimeout = setTimeout(_hideAlert,3000);
  }
  var _hideAlert = function(){
    $('.v-common-alert').alert('close');
  }

  function initiate() {
    return {
      isLogin: _isLogin,
      setCookie: _setCookie,
      getCookie: _getCookie,
      deleteCookie: _deleteCookie,
      setSessionStorage: _setSessionStorage,
      getSessionStorage: _getSessionStorage,
      deleteSessionStorage: _deleteSessionStorage,
      showAlert: _showAlert,
      hideAlert: _hideAlert
    };
  }

  return {
    getInstance: function() {
      if (!_instance) {
        _instance = initiate();
      }
      return _instance;
    }
  }
})();
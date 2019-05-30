var commonUtil = (function() {
  var _instance;
  var _isLogin = function(callback){
    var authorizationToken = _getSessionStorage('authorizationToken');
    console.log('_isLogin check called');
    request('get','/v1/login-check',null,{
      authorization : authorizationToken,
    })
      .then(function(res){
        global.loginState = res.data.data.result;
        console.log('login check result : ',global.loginState);
        if(callback){
          callback();
        }
      })
      .catch(function(err){
        console.log(err);
      })
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


  function initiate() {
    return {
      isLogin: _isLogin,
      setCookie: _setCookie,
      getCookie: _getCookie,
      deleteCookie: _deleteCookie,
      setSessionStorage: _setSessionStorage,
      getSessionStorage: _getSessionStorage,
      deleteSessionStorage: _deleteSessionStorage,
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
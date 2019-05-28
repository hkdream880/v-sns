var commonUtil = (function() {
  var _instance;
  var _isLogin = function(){
    //var request = function(method, url, param, headers, success, fail){
    request('get','/v1/login-check',null,null)
      .then(function(res){
        global.loginState = res.data.data.result;
        console.log('login check result : ',global.loginState);
      })
      .catch(function(err){
        console.log(err);
      })
  }

  var _setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = namae + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  };

  var _getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  };

  var _deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }


  function initiate() {
    return {
      isLogin: _isLogin,
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
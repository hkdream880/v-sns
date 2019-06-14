var commonUtil = {  
  globalVueEvt: function(str){
    alert(str);
  },
  getHeader : function(headerObj){
    if(!headerObj){
      headerObj = {};
    }
    headerObj.authorization = global.commonUtil.getInstance().getSessionStorage('authorizationToken');
    return headerObj;
  },
  isLogin : function(callback,fail){
    console.log('_isLogin check called');
    global.request('get','/v1/login-check',null,null,
    function(res){
      console.log('login check res',res);
      global.loginState = res.data.info!==null;
      global.userInfo = res.data.info;
      global.commonUtil.getInstance().getRoomList(callback);
    },function(err){
      if(fail){
        global.loginState = false;
        fail();
      }
    });
  },
  setCookie: function(key, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = key + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  },

  getCookie: function(key) {
    var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value? value[2] : null;
  },

  deleteCookie: function(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  setSessionStorage: function(key, value){
    console.log('_setSessionStorage');
    sessionStorage.setItem(key, value);
  },
  getSessionStorage: function(key){
    return sessionStorage.getItem(key);
  },
  deleteSessionStorage: function(key){
    storage.removeItem(key);
  },
  showAlert: function(msg,strongMsg){
    clearTimeout(_alertTimeout);
    _hideAlert();
    var alertTemplate = `
    <div class="alert alert-warning alert-dismissible fade show v-common-alert" role="alert">
      <strong>${strongMsg?strongMsg:'' }</strong>${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    $('#alert_area').html(alertTemplate);
    _alertTimeout = setTimeout(_hideAlert,3000);
  },
  hideAlert: function(){
    $('.v-common-alert').alert('close');
  },
  setNowRouter: function(targetRouter){
    global.nowRouter = targetRouter;
  },
  getRoomList: function(callback){
    console.log('getRoomList')
    if(!global.chatRoomList){
      global.request('get','/v1/room-list',null,null,
      function(res){
        console.log(res);
        global.chatRoomList = res.data;
        global.socketManager.socketInit(res.data,callback);
      }) 
    }else{
      if(callback){
        callback();
      }
    }
  } 
};


// global.commonUtil = (function() {
//   var _instance;
//   var _isLogin = function(callback,fail){
//     console.log('_isLogin check called');
//     global.request('get','/v1/login-check',null,null,
//     function(res){
//       console.log('login check res',res);
//       global.loginState = res.data.info!==null;
//       global.userInfo = res.data.info;
//       global.commonUtil.getInstance().getRoomList(callback);
//     },function(err){
//       if(fail){
//         global.loginState = false;
//         fail();
//       }
//     });
//   };
  
//   var _setCookie = function(key, value, exp) {
//     var date = new Date();
//     date.setTime(date.getTime() + exp*24*60*60*1000);
//     document.cookie = key + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
//   };

//   var _getCookie = function(key) {
//     var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
//     return value? value[2] : null;
//   };

//   var _deleteCookie = function(key) {
//     document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//   }

//   var _setSessionStorage = function(key, value){
//     console.log('_setSessionStorage');
//     sessionStorage.setItem(key, value);
//   }
//   var _getSessionStorage = function(key){
//     return sessionStorage.getItem(key);
//   }
//   var _deleteSessionStorage = function(key){
//     storage.removeItem(key);
//   }
//   var _alertTimeout = null;
//   var _showAlert = function(msg,strongMsg){
//     clearTimeout(_alertTimeout);
//     _hideAlert();
//     var alertTemplate = `
//     <div class="alert alert-warning alert-dismissible fade show v-common-alert" role="alert">
//       <strong>${strongMsg?strongMsg:'' }</strong>${msg}
//       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>`
//     $('#alert_area').html(alertTemplate);
//     _alertTimeout = setTimeout(_hideAlert,3000);
//   }
//   var _hideAlert = function(){
//     $('.v-common-alert').alert('close');
//   }
//   var _setNowRouter = function(targetRouter){
//     global.nowRouter = targetRouter;
//   }
//   var _getRoomList= function(callback){
//     console.log('var _getRoomList')
//     if(!global.chatRoomList){
//       global.request('get','/v1/room-list',null,null,
//       function(res){
//         console.log(res);
//         global.chatRoomList = res.data;
//         global.socketManager.socketInit(res.data,callback);
//       }) 
//     }else{
//       if(callback){
//         callback();
//       }
//     }
//   };

//   function initiate() {
//     return {
//       isLogin: _isLogin,
//       setCookie: _setCookie,
//       getCookie: _getCookie,
//       deleteCookie: _deleteCookie,
//       setSessionStorage: _setSessionStorage,
//       getSessionStorage: _getSessionStorage,
//       deleteSessionStorage: _deleteSessionStorage,
//       showAlert: _showAlert,
//       hideAlert: _hideAlert,
//       getRoomList: _getRoomList,
//       setNowRouter: _setNowRouter,
//     };
//   }

//   return {
//     getInstance: function() {
//       if (!_instance) {
//         _instance = initiate();
//       }
//       return _instance;
//     }
//   }
// })();
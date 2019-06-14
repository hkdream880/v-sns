common.data = {
  loginState: false,
  chatRoomList: [],
};

// var global = {
//   data: function(){
//     return {
//       authorizationToken : null,
//       loginState : false,
//       vm : null,
//       router: null,
//       userInfo: null,
//       chatRoomList: null,
//       socketManager: null,
//       request: null,
//       commonUtil: null,
//       nowRouter: null,
//       testVal: 'testVal',
//       socket: null,
//       alertTimeout : null,
//     };
//   },
//   methods: {
//     getHeader : function(headerObj){
//       if(!headerObj){
//         headerObj = {};
//       }
//       headerObj.authorization = global.commonUtil.getInstance().getSessionStorage('authorizationToken');
//       return headerObj;
//     },
//     isLogin : function(callback,fail){
//       console.log('_isLogin check called');
//       global.request('get','/v1/login-check',null,null,
//       function(res){
//         console.log('login check res',res);
//         global.loginState = res.data.info!==null;
//         global.userInfo = res.data.info;
//         global.commonUtil.getInstance().getRoomList(callback);
//       },function(err){
//         if(fail){
//           global.loginState = false;
//           fail();
//         }
//       });
//     },
//     setCookie: function(key, value, exp) {
//       var date = new Date();
//       date.setTime(date.getTime() + exp*24*60*60*1000);
//       document.cookie = key + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
//     },
  
//     getCookie: function(key) {
//       var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
//       return value? value[2] : null;
//     },
  
//     deleteCookie: function(key) {
//       document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     },
  
//     setSessionStorage: function(key, value){
//       console.log('_setSessionStorage');
//       sessionStorage.setItem(key, value);
//     },
//     getSessionStorage: function(key){
//       return sessionStorage.getItem(key);
//     },
//     deleteSessionStorage: function(key){
//       storage.removeItem(key);
//     },
//     showAlert: function(msg,strongMsg){
//       clearTimeout(_alertTimeout);
//       _hideAlert();
//       var alertTemplate = `
//       <div class="alert alert-warning alert-dismissible fade show v-common-alert" role="alert">
//         <strong>${strongMsg?strongMsg:'' }</strong>${msg}
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>`
//       $('#alert_area').html(alertTemplate);
//       _alertTimeout = setTimeout(_hideAlert,3000);
//     },
//     hideAlert: function(){
//       $('.v-common-alert').alert('close');
//     },
//     setNowRouter: function(targetRouter){
//       global.nowRouter = targetRouter;
//     },
//     getRoomList= function(callback){
//       console.log('getRoomList')
//       if(!global.chatRoomList){
//         global.request('get','/v1/room-list',null,null,
//         function(res){
//           console.log(res);
//           global.chatRoomList = res.data;
//           global.socketManager.socketInit(res.data,callback);
//         }) 
//       }else{
//         if(callback){
//           callback();
//         }
//       }
//     },
//   }
// }
var common = {};
common.util = {

  setUserInfo: function(info){
    if(info){
      this.userInfo = info;
    }
  },

  setLoginState: function(state){
    this.loginState = state;
  },

  isLogin : function(callback,fail){
    console.log('_isLogin check called');
    this.$http({
      url: '/v1/login-check',
      headers: this.getHeader(),
      method: 'get'
    }).then($.proxy(function(res){
      this.loginState = res.data.data.info!==null;
      this.userInfo = res.data.data.info;
      if(callback){
        callback();
      }
    },this)).catch($.proxy(function(err){
      this.loginState = false;
      this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
      if(fail){
        fail();
      }
    },this));
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

  getRoomList: function(callback){
    console.log('getRoomList')
      this.$http({
        url: '/v1/room-list',
        headers: this.getHeader(),
        method: 'get'
      }).then($.proxy(function(res){
        this.chatRoomList = res.data.data;
        console.log(this.chatRoomList);
        //TODO 소켓 연결
        //global.socketManager.socketInit(res.data,callback);
        this.socketInit(this.chatRoomList);
      },this)).catch($.proxy(function(err){
        console.log(err.response);
      },this));
  },

  socketInit: function(roomList,callback){
    console.log('socketInit called');
    console.log(roomList)
    roomList.forEach($.proxy(function(data,idx){
      console.log('roomList.forEach idx : '+idx+' room id : '+data.id);
      this.connectChatSocket(data.id);
      this.bindSocketEvetn(this.chatSocket);
    },this));
    console.log('this.roomSocket test');  
    this.connectRoomSocket();
    if(callback){
      callback();
    }
  },
  connectRoomSocket: function(){
    this.roomSocket = io.connect('http://localhost:3000/room', {
      path: '/v-chat',
    });
    this.roomSocket.on('new',$.proxy(function(data){
      console.log('new room !!!!!!');
      console.log(this.chatRoomList)
      console.log(data)
      this.chatRoomList.push(data);
      console.log('new room added!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(this.chatRoomList);
      this.connectChatSocket(data.id);
      this.bindSocketEvetn(this.chatSocket);
    },this));
  },
  connectChatSocket: function(roomId){
    console.log(`connectSocket called : ${roomId }`);
    this.chatSocket = io(`http://localhost:3000/chat?roomId=${roomId }`,{
      query: `roomId=${roomId }`,
      path: '/v-chat',
    });
  },
  bindSocketEvetn: function(socket){
    socket.on('new',$.proxy(function(data){
    },this));
    socket.on('join',$.proxy(function(data){
    },this));
    socket.on('chat',$.proxy(function(data,user){
      if(this.$router.currentRoute.path.indexOf('/chat/')>=0){
        this.$EventBus.$emit('newchat',data);
      }else{
        //show modal or toast
        this.$EventBus.$emit('showAlert',data.chat,user.email, 'blue',user.id);
      }
    },this));
  }
};
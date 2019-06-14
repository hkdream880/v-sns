global.socketManager = {
  socketInit: function(roomList,callback){
    roomList.forEach($.proxy(function(data,idx){
      console.log('roomList.forEach idx : ',idx);
      this.connectSocket(data.id);
      this.bindSocketEvetn(global.socket);
    },this))
    if(callback){
      callback();
    }
  },
  connectSocket: function(roomId){
    console.log(`connectSocket called : ${roomId }`);
    global.socket = io.connect('http://localhost:3000/chat', {
      path: '/v-chat',
      query: `roomId=${roomId }`
    });
  },
  bindSocketEvetn: function(socket){
    socket.on('join',function(data){
      console.log('socket join event called ',data);
    });
    socket.on('exit',function(){
      console.log('socket exit event called');
    });
    socket.on('chat',function(data){
      console.log('socket chat event called data : ',data);
      //console.log(global.vm.$children[0].emitTest());
      //global.nowRouter.emitTest();
      console.log(global.vm);
    });
  }
}
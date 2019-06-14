const SocketIO = require('socket.io');
const axios = require('axios');
const querystring = require('querystring');

module.exports = (server,app,sessionMiddleware) => {
  const io = SocketIO(server,{
    path : '/v-chat',
    //transports : ['websocket']  //브라우저의 웹소켓 사용 가능 여부 확인 skip을 원할 경우(기본적으료 확인 후 사용x일경우 폴링 사용 가능 할 경우 websocket 연결)
  });
  app.set('io',io); //추후 라우터에서 io를 빼오고 이벤트 emit을 위해... ex : req.app.get('io').of('/room').emit
  //네임스페이스
  //socket io 기본값 io.of('/')
  const room = io.of('/room');  //새로운 채팅방 생성을 위해
  const chat = io.of('/chat');  //새로운 채팅 알림을 위해

  //익스프레스 미들웨어를 소캣IO에서 쓰는 방법
  io.use((socket,next)=>{
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  room.on('connection',(socket)=>{
    console.log('room namespace accessed');
    socket.on('disconnect',()=>{
      console.log('room namespace disconnected');
    });
  });

  chat.on('connection',(socket)=>{
    const req = socket.request;
    const { headers : { cookie } } = req;
    const reqParam = querystring.parse(req.url.split('?')[1]);
    //const roomId = referer.split('/')[referer.split('/').length-1].replace(/\?.+/,'');
    const roomId = reqParam.roomId;
    socket.join(roomId);
    socket.to(roomId).emit('join',{
      user:'system',
      chat:`test님이 입장하셨습니다.`,
      number: socket.adapter.rooms[roomId].length,
    });
    // axios.post(`http://localhost:8005/room/${roomId}/sys`,{
    //   type : 'join',
    // },{
    //   headers: {
    //     Cookie: req.headers.cookie,
    //   }
    // })
    socket.on('disconnect',()=>{
      console.log('disconnect : ',roomId)
      socket.leave(roomId);
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      socket.to(roomId).emit('exit',{
        user: 'system',
        chat: `${req.session.color}님이 퇴장하셨습니다.`,
        number: socket.adapter.rooms[roomId]?socket.adapter.rooms[roomId].length:0,
      });
      // if(userCount === 0 ){
        // axios.delete(`http://localhost:8005/room/${roomId}`)
        //   .then(()=>{
        //     console.log('room remove success');
        //   })
        //   .catch((error)=>{
        //     console.error(error);
        //   })
      // }else{
        // socket.to(roomId).emit('exit',{
        //   user: 'system',
        //   chat: `${req.session.color}님이 퇴장하셨습니다.`,
        //   number: socket.adapter.rooms[roomId].length,
        // });
        // axios.post(`http://localhost:8005/room/${roomId}/sys`,{
        //   type : 'exit',
        // },{
        //   headers: {
        //     Cookie: req.headers.cookie,
        //   }
        // })
      // };
    });
    // socket.on('dm',(data)=>{
    //   socket.to(data.target).emit('dm',data)
    //   //socket.to(data.target) 1:1
    //   //socket.to(방아이디) room 채팅
    //   //socket.emit() 전체 
    // });
    // socket.on('ban',(data)=>{
    //   socket.to(data.id).emit('ban')
    // });
  });  
};
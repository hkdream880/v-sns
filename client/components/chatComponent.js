var Chat = {
  template: `
    <div class="container">
    <h3 class=" text-center">{{roomId}}</h3>
    <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input type="text" class="search-bar"  placeholder="Search" >
                    <span class="input-group-addon">
                    <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
              </div>
              <div class="inbox_chat">

                <div class="chat_list active_chat" v-for="room in roomList">
                  <div class="chat_people">
                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div class="chat_ib">
                      <h5>TBD <span class="chat_date">Dec 25</span></h5>
                      <p>Chat prototype</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                <div class="incoming_msg">
                  <div v-for="chat in chatList">

                  <div v-if="chat.userId !== userInfo.id" class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div v-if="chat.userId !== userInfo.id" class="received_msg">
                      <div class="received_withd_msg">
                        <p>
                          {{chat.chat}}
                        </p>
                        <span class="time_date"> 11:01 AM    |    June 9</span></div>
                    </div>
                  
                    <div v-if="chat.userId === userInfo.id" class="outgoing_msg">
                    <div class="sent_msg">
                      <p>
                        {{chat.chat}}
                      </p>
                      <span class="time_date"> 11:01 AM    |    June 9</span> </div>
                  </div>

                  </div>

                  
                  </div>
                </div>
                <div class="type_msg">
                  <div class="input_msg_write">
                    <input v-model="chat" v-bind:disabled="roomId==='none'" type="text" class="write_msg" v-bind:placeholder="chatPlaceHolder" />
                    <button class="msg_send_btn" type="button" @click="sendChat"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
            </div>  
          <p class="text-center top_spac"> Design by <a target="_blank" href="#">Sunil Rajput</a></p>
        </div>
      </div>`,
  props: ['roomId'],
  data: function(){
    return {
      socket: null,
      roomList: global.chatRoomList,
      userInfo: global.userInfo,
      chatList: [],
      chat: '',
    }
  },
  methods: {
    init: function(vm){
      console.log('chat component init');
      /*
      TODO
        - 방 목록과 해당 방 목록의 마지막 채팅 내용 받기
        - 방 번호 있으면 해당 채팅 활성화
      */
      if(this.roomId==='none'){
        this.chatList = [];
      }else{
        this.getChat();
      }
    },
    getChat: function(){
      console.log('getChat called res: ');
      global.request('get','/v1/chat-contents',{roomId: this.roomId},null,
      $.proxy(function(res){
        console.log(res.data);
        this.chatList = res.data;
      },this))
    },
    sendChat: function(){
      console.log('sendChat called');
      global.request('post','/v1/chat',{chat: this.chat,roomId: this.roomId},null,
      $.proxy(function(res){
        console.log(res);
      },this),
      $.proxy(function(err){
        console.log(err);
      },this));
    }
  },
  computed: {
    chatPlaceHolder : function(){
      return this.roomId==='none'?'채팅방을 선택 해 주세요':'메세지를 입력 해 주세요';
    }
  },
  beforeRouteEnter (to, from, next) {
    next(function(vm){
      // commonUtil.getInstance().setNowRouter(vm);
      console.log('router test !@@@@@@@@@@@@@@');
      console.log(vm);
      console.log(global.vm.$children);
      vm.init();
    });
  },
  beforeRouteLeave (to, from, next) {
    next();
  }   
}
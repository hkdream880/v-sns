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
              <router-link :to="{ name: 'chat', params: {roomId: room.id} }" v-for="room in roomlist">
                <div class="chat_list" v-bind:class="{ active_chat: room.id==roomId }" >
                  <div class="chat_people">
                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div class="chat_ib">
                      <h5>{{room.chats[0]?room.chats[0].chat:'대화가 없습니다.'}} 
                        <span class="chat_date">{{room.chats[0]?room.chats[0].createdAt:''}}</span>
                      </h5>
                      <p>{{room.users[0].email}}</p>
                    </div>
                  </div>
                </div>
              </router-link>
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                <div class="incoming_msg">
                  <div v-for="chat in chatList">

                  <div v-if="chat.userId !== userinfo.id" class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div v-if="chat.userId !== userinfo.id" class="received_msg">
                      <div class="received_withd_msg">
                        <p>
                          {{chat.chat}}
                        </p>
                        <span class="time_date"> {{chat.createdAt}} </span></div>
                    </div>
                  
                    <div v-if="chat.userId === userinfo.id" class="outgoing_msg">
                    <div class="sent_msg">
                      <p>
                        {{chat.chat}}
                      </p>
                      <span class="time_date"> {{chat.createdAt}} </span> </div>
                  </div>
                  </div>

                  
                  </div>
                </div>
                <div class="type_msg">
                  <div class="input_msg_write">
                    <input v-model="chat" v-bind:disabled="roomId==='none'" type="text"  v-on:keyup.enter="sendChat" class="write_msg" v-bind:placeholder="chatPlaceHolder" />
                    <button class="msg_send_btn" type="button" v-on:click="sendChat" ><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
            </div>  
          <p class="text-center top_spac"> Design by <a target="_blank" href="#">Sunil Rajput</a></p>
        </div>
      </div>`,
  props: ['roomId','roomlist','userinfo'],
  data: function(){
    return {
      socket: null,
      chatList: [],
      chat: '',
    }
  },
  methods: {
    init: function(vm){
      console.log('chat component init');
      this.getChat();
    },
    getChat: function(){
      if(this.roomId==='none'){
        this.chatList = [];
        return;
      }
      console.log('getChat called res: ');
      this.$http({
        url: '/v1/chat-contents',
        headers: this.getHeader(),
        method: 'get',
        params: {roomId: this.roomId}
      }).then($.proxy(function(res){
        console.log(res.data);
        this.chatList = res.data.data;
      },this));
    },
    getNewChat: function(chatObj){
      console.log('getNewChat called');
      console.log(chatObj)
      if(chatObj.roomId==this.roomId){
        this.chatList.push(chatObj);
      }
      for(var i=0;i<this.roomlist.length;i++){
        if(this.roomlist[i].id==chatObj.roomId){
          if(this.roomlist[i].chats.length<=0){
            this.roomlist[i].chats.push(chatObj);
          }else{
            //this.roomlist[i].chats[0] = chatObj;  동적 변환 안됨
            this.roomlist[i].chats.splice(0, 1, chatObj);
          }
          break;
        }
      }
    },
    sendChat: function(){
      console.log('sendChat called');
      if(this.chat.length<=0){
        return;
      }
      this.$http({
        url: '/v1/chat',
        headers: this.getHeader(),
        method: 'post',
        data: {chat: this.chat,roomId: this.roomId}
      }).then($.proxy(function(res){
        console.log(res);
        console.log(this.chatList);
        this.chat = '';
      },this)).catch($.proxy(function(err){
        console.log(err);
      },this));
    }
  },
  computed: {
    chatPlaceHolder : function(){
      return this.roomId==='none'?'채팅방을 선택 해 주세요':'메세지를 입력 해 주세요';
    }
  },
  watch : {
    roomId : function(data){
      console.log('room changed!! roomId : ',data);
      this.getChat();
    }
  },
  mixins: [mixins],
  created: function(){
    //getNewChat
    this.$EventBus.$on('newchat',this.getNewChat);
  },
  mounted: function(){
    
  },
  beforeRouteEnter (to, from, next) {
    next(function(vm){
      vm.init();
    });
  },
  beforeRouteLeave (to, from, next) {
    next();
  }   
}
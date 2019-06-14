var Home = { 
  template: `
    <main role="main" class="container">
      <div class="starter-template v-home">
        <div class="card">
          <img src="./common/img/main.jpg" class="card-img-top v-main-img" alt="...">
          <div class="card-body">
            <h5 class="card-title">V - SNS.{{loginstate}}</h5>
            <div class="v-btn-container" v-if="!loginstate">
              <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">로그인</button> method 연결 없이 출력 가능-->
              <button type="button" class="btn btn-primary" @click="$EventBus.$emit('showLogin')">로그인</button>
              <router-link to="/join" class="btn btn-primary" exact>회원가입</router-link>
            </div>
          </div>
        </div>
      </div>
      <button @click="socketTest('1')"> socket1 test </button>
      <button @click="socketTest('3')"> socket3 test </button>
      <button @click="socketTest('4')"> socket4 test </button>
      <button @click="socketDisconnect()"> socketDisconnect test </button>
      <button v-on:click="bustest()">bus test</button>
    </main>
  `,
  data: function(){
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    bustest: function(){
      //this.$EventBus.$emit('showAlert','param1','param2');
      
    },
    showLogin: function(){
      console.log('showLogin');
      this.$EventBus.$emit('showLogin');
      console.log(this.$EventBus)

    },
    doLogin: function(e){
      // global.request('post','/v1/login',{ email: this.email, password: this.password },null,
      //   $.proxy(function(res){
      //     if(res.code===201){
      //       this.loginState = true;
      //       global.loginState = this.loginState ;
      //       global.userInfo = res.info;
      //       global.commonUtil.getInstance().setSessionStorage('authorizationToken',res.token);
      //       $('#login_close_btn').trigger('click');
      //       if(!global.chatRoomList){
      //         global.commonUtil.getInstance().getRoomList();
      //       };
      //     }
      //   },this),
      //   $.proxy(function(err){
      //     $('.alert').removeClass('hide')
      //     setTimeout(function(){
      //       $('.alert').addClass('hide')
      //     },3000)
      //   },this)
      // )   
    },
    socketTest: function(socketIdx){
      console.log('socketTest');
      console.log(socketIdx);
      // global.request('post','/v1/chat',{chat: 'testChat',roomId: socketIdx},null,
      // $.proxy(function(res){
      //   console.log(res);
      // },this),
      // $.proxy(function(err){
      //   console.log(err);
      // },this));
    },
    socketDisconnect: function(){
      //global.socket.disconnect();
    }
  },
  computed: {
    
  },
  props: ['loginstate'],
  mounted: function(){
    console.log(this);
  },
  mixins: [mixins],
  beforeRouteEnter (to, from, next) {
    next();
  },
  beforeRouteLeave (to, from, next) {
    next();
  }   
};
var FriendsList = {
  template : `
  <div class="v-home">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Fluid jumbotron</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>

    <div class="input-group">
      <input type="text" class="form-control" v-model="findValue" aria-label="Text input with segmented dropdown button" v-bind:placeholder="changeFilterName.holder">
      <div class="input-group-append">
        <button @click="doFind" type="button" class="btn btn-outline-secondary">{{changeFilterName.btn}}</button>
        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item" @click="filterValue='email'">친구찾기</button>
          <!--<button class="dropdown-item" @click="filterValue='list'">친구목록검색</button>-->
          <!--<div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>-->
        </div>
      </div>
    </div>
    
    <div class="v-friend-list">
      <ul class="list-group">
        <li class="list-group-item" v-for="item in showList">
          <img src="./common/img/coffie.jpg" class="rounded v-profile" alt="...">
          {{item.email}}
          <!-- 친구 목록 -->
          <button type="button" class="btn btn-primary" @click="moveChat(item.id)">Chat</button>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">Delete</button>
        </li>
      </ul>
    </div>

    <div class="v-friend-list" v-show="findList.length>0">
      <ul class="list-group">
        <li class="list-group-item" v-for="item in findList">
          <img src="./common/img/coffie.jpg" class="rounded v-profile" alt="...">
          {{item.email}}
          <!-- 친구 찾기 -->
          <button v-if="resultType==='email'" type="button" class="btn btn-primary" @click="addFollowList(item.id)">Follow</button>
        </li>
      </ul>
    </div>
  </div>
  `,
  data: function(){
    return {
      filterValue: 'email', //email or list
      findValue: '',
      showList : [],
      findList: [],
      resultType: 'list', //email or list
    }
  },
  methods: {
    doFind: function(){
      if(this.filterValue==='email'){
        this.findEmail(this.findValue);
      }else{
        console.log('TODO: filter 제작 후 리스트 내 목록 검색');
      }
    },
    getFollowList: function(){
      this.$http({
        url: '/v1/follow',
        headers: this.getHeader(),
        method: 'get',
      }).
      then($.proxy(function(res){
        console.log(res.data);
        this.showList = res.data.data;
        console.log(this.showList);
      },this))
      .catch($.proxy(function(err){
        console.log(err.response);
        this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
      },this));
    },
    findEmail: function(){
      if(!this.findValue){
        this.$EventBus.$emit('showAlert','검색어를 입력해 주세요.');
        return;
      }
      this.$http({
        url: '/v1/find-user',
        headers: this.getHeader(),
        method: 'get',
        params: {email: this.findValue}
      }).then($.proxy(function(res){
        console.log(res);
        if(!res.data.data.list||res.data.data.list.length<=0){
          this.$EventBus.$emit('showAlert','결과가 없습니다.',err.response.data.code);
          return;
        }
        this.resultType = this.filterValue;
        this.findList = res.data.data.list;
      },this)).catch($.proxy(function(err){
        console.log(err.response);
        this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
      },this))
    },
    addFollowList: function(id){
      for(var i=0;i<this.showList.length;i++){
        if(this.showList[i].id == id){
          this.$EventBus.$emit('showAlert','목록에 존재 합니다.');
          return;
        }
      }
      this.$http({
        url: '/v1/add-follow',
        headers: this.getHeader(),
        method: 'post',
        data: {addId: id}
      }).then($.proxy(function(res){
        console.log(res.data);
        this.showList.push(res.data.data);
      },this)).catch($.proxy(function(err){
        console.log(err.response);
        this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
      },this))
    },
    deleteFollowList: function(){
      console.log('deleteFollowList called');
    },
    moveChat: function(targetId){
      console.log('moveChat targetId: ',targetId);
      /*
      방 체크 및 생성 api 제작
      리턴 받은 후 화면 전환
      */
     this.$http({
        url: '/v1/check-room',
        headers: this.getHeader(),
        method: 'post',
        data: {targetId: targetId}
      }).then($.proxy(function(res){
        approuter.push('/chat/'+res.data.data);
      },this)).catch($.proxy(function(err){
        console.log(err);
        this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
      },this));
    }
  },
  computed: {
    changeFilterName: function(){
      return {
        btn: this.filterValue==='email'?'친구찾기':'친구목록검색',
        holder: this.filterValue==='email'?'email을 입력 해 주세요':'Follower List의 email을 입력 해 주세요',
      }
    }
  },
  mixins: [mixins],
  created: function(){
    
  },
  beforeRouteEnter (to, from, next) {
    next(function(vm){
      vm.getFollowList();
    });
  },
  beforeRouteLeave (to, from, next) {
    next();
  }
}
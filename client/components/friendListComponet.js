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
          <button class="dropdown-item" @click="filterValue='list'">친구목록검색</button>
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
          <!-- 친구 찾기 -->
          <button v-if="resultType==='email'" type="button" class="btn btn-primary" @click="addFollowList(item.id)">Follow</button>
          <!-- 친구 목록 -->
          <button v-if="resultType==='list'" type="button" class="btn btn-primary">Send DM</button>
          <button v-if="resultType==='list'" type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">Delete</button>
        </li>
      </ul>
    </div>

    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            삭제하시겠습니까?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data: function(){
    return {
      filterValue: 'email', //email or list
      findValue: '',
      showList : [],
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
      console.log('getFollowList called');
      //request('post','/v1/add-follow',{addId: id},null,
      request('get','/v1/follow',null,null,
      $.proxy(function(res){
        console.log(res);
        this.showList = res.data;
        console.log(this.showList);
      },this),
      $.proxy(function(err){
        console.log(err);
        commonUtil.getInstance().showAlert(err.data,err.code);
      },this));
    },
    findEmail: function(){
      if(!this.findValue){
        commonUtil.getInstance().showAlert('검색어를 입력 해 주세요');
        return;
      }
      request('get','/v1/find-user',{email: this.findValue},{},
      $.proxy(function(res){
        console.log(res);
        if(!res.data.list||res.data.list.length<=0){
          commonUtil.getInstance().showAlert('결과가 없습니다.');
          return;
        }
        this.resultType = this.filterValue;
        this.showList = res.data.list;
      },this),
      $.proxy(function(err){
        console.log(err);
        commonUtil.getInstance().showAlert(err.data,err.code);
      },this));
    },
    addFollowList: function(id){
      console.log('addFollowList called id : ',id);
      request('post','/v1/add-follow',{addId: id},null,
      $.proxy(function(res){
        console.log(res);
      },this),
      $.proxy(function(err){
        console.log(err);
        commonUtil.getInstance().showAlert(err.data,err.code);
      },this));
    },
    deleteFollowList: function(){
      console.log('deleteFollowList called');
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
  beforeRouteEnter (to, from, next) {
    next(function(vm){
      vm.getFollowList();
    });
  },
  beforeRouteLeave (to, from, next) {
    next();
  }
}
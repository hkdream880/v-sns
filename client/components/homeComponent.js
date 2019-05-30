var Home = { 
  template: `
    <main role="main" class="container">
      
      <div class="starter-template v-home">
        <div class="card">
          <img src="./common/img/main.jpg" class="card-img-top v-main-img" alt="...">
          <div class="card-body">
            <h5 class="card-title">V - SNS.{{loginState}}</h5>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">로그인</button>
            <router-link to="/join" class="btn btn-primary" exact>회원가입</router-link>
          </div>
        </div>
      </div>

           
      <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title h4" id="mySmallModalLabel">Small modal</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              </div>
                <div class="modal-body">
                <form @submit.prevent="testJoin">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                  </div>
                  <button id="submit_btn" type="submit" class="btn btn-primary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="test" >Submit</button>
                </form>
              </div>
          </div>
          <div class="alert alert-danger hide" role="alert">
            로그인에 실패하였습니다.
          </div>
        </div>
      </div>
    </main>
  `,
  data: function(){
    return {
      email: '',
      password: '',
      loginState: global.loginState, 
    }
  },
  methods: {
    testJoin: function(e){
      request('post','/v1/login',{ email: this.email, password: this.password })
        .then(function(res){
          if(res.data.code===201){
            console.log('로그인 성공')
            global.loginState = true;
            this.loginState = global.loginState;
            commonUtil.getInstance().setSessionStorage('authorizationToken',res.data.token);
          }
        })
        .catch(function(err){
          $('.alert').removeClass('hide')
          setTimeout(function(){
            $('.alert').addClass('hide')
          },3000)
        })
    }
  }
};
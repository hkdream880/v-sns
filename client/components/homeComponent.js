var Home = { 
  template: `
    <main role="main" class="container">
      <div class="starter-template v-home">
        <div class="card">
          <img src="./common/img/main.jpg" class="card-img-top v-main-img" alt="...">
          <div class="card-body">
            <h5 class="card-title">V - SNS.</h5>
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
            <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary" @click="testJoin">Submit</button>
          </form>
            </div>
        </div>
      </div>
    </div>
    </main>
  `,
  methods: {
    testJoin: function(e){
      e.preventDefault();
      //alert('test');
      axios.post('/v1/login',{
        email: "test@test.com",
        password: "111122"
      })
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        })
    }
  }
};
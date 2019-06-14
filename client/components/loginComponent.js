/*
  ref : https://getbootstrap.com/docs/4.3/components/modal/
  ex: $this.modal('show')
*/
var loginComponent = { 
  props: ['loginstate'],
  template: `
  <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h4" id="mySmallModalLabel">Small modal</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="login_close_btn">
          <span aria-hidden="true">×</span>
        </button>
        </div>
          <div class="modal-body">
          <form v-on:submit.prevent="doLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button id="submit_btn" type="submit" class="btn btn-primary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="test">Submit</button>
          </form>
        </div>
    </div>
  </div>
</div>
  `,
  mixins: [mixins],
  data: function(){
    return {
      $login: null,
      email: '',
      password: '',
    };
  },
  methods: {
    showLogin: function(){
      $login.modal('show');
    },
    doLogin: function(){
      console.log(this.email);
      console.log(this.password);
      var axiocConfig = {
        url: '/v1/login',
        headers: this.getHeader(),
        method: 'post',
        data: {email: this.email, password: this.password }
      }; 
      this.$http(axiocConfig).
      then(this.loginCallback).
      catch(function(err){
        console.log(err);
      });
    },
    loginCallback:function(response){
      console.log('loginCallback response:', response);
      if(response.data.code===201){
        console.log(this.loginState);
        this.setSessionStorage('authorizationToken',response.data.token);
        this.loginState = true;
        this.$emit('setlogin',true)
        console.log(this.loginState);
        this.closeLogin();
      }else{
        this.loginFail(response);
      }
    },
    loginFail: function(err){
      this.$EventBus.$emit('showAlert',err.data.data,err.data.code);
    },
    closeLogin: function(){
      $login.modal('hide');
    },
  },
  created: function () {
    this.$EventBus.$on('showLogin',this.showLogin);
  },
  mounted: function () {
    $login = $(this.$el);
  },
};
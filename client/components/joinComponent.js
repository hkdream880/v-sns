
var Join = { 
  template: `
  <div>
    <form id="join_form" @submit.prevent="doJoin">
      <div class="form-group">
        <label for="join_email">Email 주소</label>
        <input v-model="email" name="email" type="email" class="form-control" id="join_email" aria-describedby="emailHelp" placeholder="Enter email" required>
        <small id="emailHelp" class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="join_phone">전화번호</label>
        <input v-model="phone" name="phone" type="tel" class="form-control" id="join_phone" placeholder="Password" required>
      </div>
      <div class="form-group">
        <label for="password">암호</label>
        <input v-model="password" name="password" type="password" class="form-control" id="password" placeholder="Password" required>
      </div>
      <div class="form-group">
        <label for="check_password">암호 확인</label>
        <input v-model="chkPassword" name="checkPassword" type="password" class="form-control" id="check_password" placeholder="check Password" requied>
      </div>
      <button type="submit" class="btn btn-primary">회원가입</button>
      </br></br>
      <div class="alert alert-danger" role="alert" v-bind:class="{ hide: isHide }">
        {{errMsg}}
      </div>
    </form>
  </div>
  `,
  data: function(){
    return {
      email: '',
      password: '',
      chkPassword: '',
      phone: '',
      errMsg: '',
      isHide: true,
    }
  },
  mixins: [mixins],
  methods: {
    doJoin: function(e){
      //var request = function(method, url, param, header,success, fail, option){
      if(this.password!==this.chkPassword){
        this.$EventBus.$emit('showAlert','비밀번호를 확인 해 주세요');
        return
      }
      this.$http({
        url: '/v1/join',
        headers: this.getHeader(),
        method: 'post',
        data: { email: this.email, password: this.password, phone: this.phone },
      }).then($.proxy(function(res){
        console.log('join success');
        console.log(res);
      },this)).catch($.proxy(function(err){
        console.log('join fail');
        console.log(err);
        this.$EventBus.$emit('showAlert',err.response.data,err.response.code);
      },this));
    }
  },
};
var Join = { 
  template: `
  <form id="join_form">
    <div class="form-group" v-on:submit.prevent="test">
      <label for="exampleInputEmail1">Email 주소</label>
      <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted"></small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">암호</label>
      <input name="password" type="password" class="form-control" id="password" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">암호 확인</label>
      <input name="checkPassword" type="password" class="form-control" id="check_password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary" @click="test">회원가입</button>
  </form>
  `,
  methods: {
    test: function(e){
      e.preventDefault();
      console.log('test called!')
      axios.post('/v1/join',{
        email: "test@test.com",
        password: "1111",
        phone: "01022223333"
      })
        .then(function(res){
          
        })
        .catch(function(err){
          
        })
    }
  }
};
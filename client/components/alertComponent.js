/*
  ref : https://getbootstrap.com/docs/4.3/components/alerts/
  ex: $this.alert('close');
*/
var alertComponent = { 
  template: `
  <div class="alert" v-bind:class="colorObj[colorTarget]" role="alert" style="display:none" ref="alert" @click="closeEvent">
    <a class="alert-link">{{code}}</a> {{msg}} 
  </div>
  `,
  data: function(){
    return {
      $alert: null,
      msg: '',
      code: '',
      colorObj: {
        red: 'alert-danger',
        blue: 'alert-primary',
        green: 'alert-success',
        yellow: 'alert-warning'
      },
      colorTarget: 'red',
      timeout: null,
      option: null,
    };
  },
  methods: {
    showAlert: function(msg,code,color,option){
      clearInterval(this.timeout);
      this.msg = msg;
      if(color){
        this.colorTarget = color;
      }
      if(option){
        this.option = option;
      }
      console.log('showAlert called ',msg,code);
      $alert.fadeIn();
      this.timeout = setTimeout($.proxy(function(){
        $alert.fadeOut();
      },this),3000);
    },
    closeEvent: function(){
      clearInterval(this.timeout);
      $alert.fadeOut();
      console.log(this.option)
      console.log(this.colorTarget);
      if(this.colorTarget=='blue'){
        //this.$EventBus.$emit('moveChat',this.option);
        this.$router.push('/chat/'+this.option);
        this.option = null;
      }
    }
  },
  created: function () {
    this.$EventBus.$on('showAlert',this.showAlert);
  },
  mounted: function () {
    $alert  = $(this.$el);
    //this.showAlert('test','test','yellow');
  },
};

/* <div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
<div class="alert alert-secondary" role="alert">
  A simple secondary alert—check it out!
</div>
<div class="alert alert-success" role="alert">
  A simple success alert—check it out!
</div>
<div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div>
<div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>
<div class="alert alert-info" role="alert">
  A simple info alert—check it out!
</div>
<div class="alert alert-light" role="alert">
  A simple light alert—check it out!
</div>
<div class="alert alert-dark" role="alert">
  A simple dark alert—check it out!
</div> */
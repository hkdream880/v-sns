/*
  ref : https://getbootstrap.com/docs/4.3/components/alerts/
  ex: $this.alert('close');
*/
var alertComponent = { 
  template: `
  <div class="alert alert-danger" role="alert" style="display:none" ref="alert">
    A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  `,
  data: function(){
    return {
      $alert: null,
      msg: '',
      code: '',
    };
  },
  methods: {
    showAlert: function(msg,code){
      this.msg = msg;
      code?this.code = code:code = '';
      console.log('showAlert called ',msg,code);
      $alert.fadeIn();
    }
  },
  created: function () {
    this.$EventBus.$on('showAlert',this.showAlert);
  },
  mounted: function () {
    $alert  = $(this.$el);
    //$alert.fadeOut();
    //$this.alert('close'); //초기화
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
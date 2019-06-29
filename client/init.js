var app = null;
Vue.prototype.$http = axios;
Vue.use(VueRouter)
Vue.prototype.$EventBus = new Vue();  //이벤트 버스
app = new Vue({
  mixins: [mixins],
  data: data,
  components: {
    modalComponent: modalComponent,
    headerComponent: headerComponent,
    alertComponent: alertComponent,
    loginComponent: loginComponent,
  },
  router: approuter,
  el: "#app",
  created: function(){
    this.isLogin(this.getRoomList);
  },
  mounted: function(){
    console.log(this);
    console.log('app mounted');
  },
  methods: util,

});

var app = null;
(function vueInit(){
  Vue.use(VueRouter)
  app = new Vue({
    mixins: [global],
    components: {
      'socket-component': socketComponent,
      'header-component': Header,
    },
    router: router,
    el: "#app",
    created: function(){
      console.log('app created!')
    },
    methods: commonUtil,
  });
})()
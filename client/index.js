
var vm;
 
Vue.use(VueRouter)

vm = new Vue({
  router,
  el: "#app",
  data: {
    showError: false,
  }
});

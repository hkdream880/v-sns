Vue.use(VueRouter)

global.vm = new Vue({
  router,
  el: "#app",
  data: {
    showError: false,
  }
});

commonUtil.getInstance().isLogin();

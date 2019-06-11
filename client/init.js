global.axiosInstance = axios.create();
commonUtil.getInstance().isLogin(vueInit,vueInit);

function vueInit(){
  Vue.use(VueRouter)
  console.log('vue init');
  global.vm = new Vue({
    router,
    el: "#app",
    data: {
      showError: false,
    }
  });
}

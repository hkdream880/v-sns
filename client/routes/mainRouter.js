var approuter = new VueRouter({
  routes: [
    {
      path: '/', 
      component:  Home,
      props: true,
    },
    {
      path: '/timeLine', 
      components: {
        default: TimeLine
      }
    },
    {
      path: '/join', 
      components: {
        default: Join
      }
    },
    {
      path: '/message', 
      components: {
        default: MessageBox
      }
    },
    {
      path: '/friends', 
      components: {
        default: FriendsList
      }
    },
    {
      path: '/chat/:roomId', 
      component: Chat,
      props: true,
    },
  ]
});

approuter.beforeEach((to, from, next)=>{
  NProgress.start();
  next();
  //global.commonUtil.getInstance().isLogin(next,next);
});

approuter.afterEach((to, from)=>{
  NProgress.done();
});
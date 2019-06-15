var approuter = new VueRouter({
  routes: [
    {
      path: '/', 
      component:  Home,
      props: true,
    },
    {
      path: '/timeLine', 
      component: TimeLine,
    },
    {
      path: '/join', 
      component:  Join,
    },
    {
      path: '/friends', 
      component: FriendsList
    },
    {
      path: '/chat/:roomId', 
      component: Chat,
      props: true,
      name: 'chat'
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
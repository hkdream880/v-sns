var router = new VueRouter({
  routes: [
    {
      path: '/', 
      components: {
        default: Home
      }
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
      components: {
        default: Chat
      },
      props: {
        default: true,
      }
    },
  ]
});

router.beforeEach((to, from, next)=>{
  NProgress.start();
  next();
  //global.commonUtil.getInstance().isLogin(next,next);
});

router.afterEach((to, from)=>{
  NProgress.done();
});
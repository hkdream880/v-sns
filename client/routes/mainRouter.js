var router = new VueRouter({
  routes: [
    {
      path: '/', 
      components: {
        default: Home,
        header: Header
      }
    },
    {
      path: '/timeLine', 
      components: {
        default: TimeLine,
        header: Header
      }
    },
    {
      path: '/join', 
      components: {
        default: Join,
        header: Header
      }
    },
    {
      path: '/message', 
      components: {
        default: MessageBox,
        header: Header
      }
    },
    {
      path: '/friends', 
      components: {
        default: FriendsList,
        header: Header
      }
    },
    {
      path: '/chat/:roomId', 
      components: {
        default: Chat,
        header: Header
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
});

router.afterEach((to, from)=>{
  NProgress.done();
});
var socketComponent = { 
  template: '<div>{{mixinVal}}</div>',
  data: function(){
    return {
      socket: null,
    }
  },
  methods: {
    
  },
  mixins: [global],
  created: function () {
    this.message = 'inited!!!'
    //this.mixinTest('test from socket');
  },
  mounted: function () {
    //console.error(this.$root.globalVueEvt('from socket'));
  },
};
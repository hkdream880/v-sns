var mixins = {
  data: function(){
    return {
      //loginState: false,
    };
  },
  methods: {
    setSessionStorage: function(key, value){
      sessionStorage.setItem(key, value);
    },
    getSessionStorage: function(key){
      return sessionStorage.getItem(key);
    },
    deleteSessionStorage: function(key){
      storage.removeItem(key);
    },
    getHeader : function(headerObj){
      if(!headerObj){
        headerObj = {};
      }
      headerObj.authorization = this.getSessionStorage('authorizationToken');
      return headerObj;
    }   
  }
}
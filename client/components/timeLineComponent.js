var TimeLine = { 
  template: `
    <div class="v-home">
      <form @submit.prevent="uploadSns">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">SNS</span>
          </div>
          <textarea v-model="message" class="form-control v-text-input" aria-label="With textarea" ></textarea>
        </div>
        <div class="input-group">
          <div class="custom-file">
            <input v-on:change="uploadFile" type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" >
            <label class="custom-file-label" for="inputGroupFile04">{{imgFile?imgFile.name:'이미지를 선택 해 주세요'}}</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon04">Upload</button>
          </div>
        </div>
      </form>

      <ul class="v-content-list">
        <li v-for="content in contents">
          <div class="card v-time-line-wraper" >
            <img v-if="content.image" v-bind:src="content.image" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text v-content">{{content.content}}</p>
              <p class="card-text v-content-info">{{content.user.email}} / {{content.DATE}}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li v-for="reply in content.replies" class="list-group-item"
              v-bind:class="{'v-reply-mine': content.userId==reply.userId, 'v-reply-others': content.userId!=reply.userId}">
                {{reply.reply}} / {{reply.user.email}} / {{reply.DATE}}
                <span class="badge badge-primary">New</span>
                <span class="badge badge-secondary">×</span>
              </li>
            </ul>
            <div class="input-group mb-3">
              <input v-bind:id="'reply_'+content.id" type="text" class="form-control" placeholder="리플을 남겨주세요" aria-label="리플을 남겨주세요" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="sendReply(content.id)" type="button">Reply</button>
              </div>
            </div>
            <div class="card-body">
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
        </li>
      </ul>      
    </div>
    `,
    data: function(){
      return {
        message: null,
        imgFile: null,
        contents: [],
        userId: null,
        cashValue: {},
      }
    },
    methods: {
      getContents : function(){
        console.log('testMethod called !!!');
        ///contents
        request('get','/v1/contents',null,null,
          $.proxy(function(res){
            this.userId = res.reqUser;
            this.contents = res.data;
          },this),
          $.proxy(function(err){
            console.log(err)
          },this)
        );
      },
      uploadSns: function(e){ //sns 업로드
        var header= {};
        var formData = new FormData();
        formData.append('content', this.message);
        
        if(this.imgFile){ //이미지 있을 경우
          header.enctype = 'multipart/form-data',
          formData.append('image', this.imgFile);
        }
        if(true){ //태그 있을 경우
          formData.append('hashTag', ['tag1','tag2','tag3']);
        }

        //var request = function(method, url, param, header,success, fail, option){
        request('post','/v1/write',formData,header,
        $.proxy(function(res){
          this.message = null; 
          this.imgFile = null;
          if(res.code===200){
            //this.contents.unshift(res.data);
            this.getContents();
          }
        },this),
        function(err){
          console.log(err);
        });
      },
      uploadFile: function(e){
        this.imgFile = $(e.currentTarget).prop("files")[0];
      },
      sendReply: function(contentId){
        var $inputObj = this.$el.querySelector('#reply_'+contentId)
        requestObj = {
          reply: $inputObj.value,
          contentId: contentId,
        }
        request('post','/v1/reply',requestObj,null,
        $.proxy(function(res){
          if(res.code===200){
            $inputObj.value = '';
            this.getContents();
          }
        },this),
        $.proxy(function(err){
          console.log(err);
        },this));
      }
    },
    computed: {
      // replyClass: {
      //   get: $.proxy(function(){
      //     return {
      //       'v-reply-others':this.cashValue.contentUser===this.cashValue.replyUser,
      //       'v-reply-mine':this.cashValue.contentUser!==this.cashValue.replyUser,
      //     }
      //   },this),
      //   set: $.proxy(function(cUser,rUser){
      //     this.cashValue.contentUser = cUser;
      //     this.cashValue.replyUser = rUser;
      //   },this)
      //   //'v-reply-others':'v-reply-mine'
      // }
    },
    beforeRouteEnter (to, from, next) {
      //to : 현재 컴포넌트 info Object
      //from : 이전 컴포넌트 info Object
      next(function(vm){
        vm.getContents();
      });
    },
    beforeRouteLeave (to, from, next) {
      next();
    }
};
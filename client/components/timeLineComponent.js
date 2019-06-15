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
              <p class="card-text v-content-info">{{content.user.email}} / {{content.createdAt}}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li v-for="reply in content.replies" class="list-group-item"
              v-bind:class="{'v-reply-mine': content.userId==reply.userId, 'v-reply-others': content.userId!=reply.userId}">
                {{reply.reply}} / {{reply.user.email}} / {{reply.createdAt}}
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
            <!--<div class="card-body">
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div> -->
          </div>
        </li>
      </ul>      
    </div>
    `,
    mixins: [mixins],
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
        this.$http({
          url: '/v1/contents',
          headers: this.getHeader(),
          method: 'get'
        }).
        then($.proxy(function(res){
          this.userId = res.data.reqUser;
          this.contents = res.data.data;
        },this)).
        catch($.proxy(function(err){
          console.log(err.response);
          this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
        },this));
      },
      uploadSns: function(e){ //sns 업로드
        var formData = new FormData();
        formData.append('content', this.message);
        var header = this.getHeader();
        if(this.imgFile){ //이미지 있을 경우
          header.enctype = 'multipart/form-data',
          formData.append('image', this.imgFile);
        }
        if(true){ //태그 있을 경우
          formData.append('hashTag', ['tag1','tag2','tag3']);
        }

        this.$http({
          url: '/v1/write',
          headers: header,
          method: 'post',
          data: formData
        }).
        then($.proxy(function(res){
          this.message = null; 
          this.imgFile = null;
          if(res.data.code===200){
            this.getContents();
          }
        },this)).
        catch(function(err){
          console.log(err.response);
        });
      },
      uploadFile: function(e){
        this.imgFile = $(e.currentTarget).prop("files")[0];
      },
      sendReply: function(contentId){
        var $inputObj = this.$el.querySelector('#reply_'+contentId);
        requestObj = {
          reply: $inputObj.value,
          contentId: contentId,
        }
        this.$http({
          url: '/v1/reply',
          headers: this.getHeader(),
          method: 'post',
          data: requestObj
        }).then($.proxy(function(res){
          if(res.data.code===200){
            $inputObj.value = '';
            this.getContents();
          }
        },this)).catch($.proxy(function(err){
          console.log(err.response);
          this.$EventBus.$emit('showAlert',err.response.data.data,err.response.data.code);
        },this));
      }
    },
    computed: {
      
    },
    mounted: function(){
      this.getContents();
    },
    beforeRouteEnter (to, from, next) {
      //to : 현재 컴포넌트 info Object
      //from : 이전 컴포넌트 info Object
      next();
    },
    beforeRouteLeave (to, from, next) {
      next();
    }
};
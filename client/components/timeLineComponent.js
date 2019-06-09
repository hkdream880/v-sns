var TimeLine = { 
  template: `
    <div class="v-home">
      <form @submit.prevent="uploadSns">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">SNS</span>
          </div>
          <textarea v-model="message" class="form-control" aria-label="With textarea" ></textarea>
        </div>
        <div class="input-group">
          <div class="custom-file">
            <input v-on:change="uploadFile" type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" >
            <label class="custom-file-label" for="inputGroupFile04">{{imgFile?imgFile.name:'Choose file'}}</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon04">Upload</button>
          </div>
        </div>
      </form>

      
      <div class="card v-time-line-wraper" >
        <img src="./common/img/coffie.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item v-reply-others">
            Cras justo odio 
            <span class="badge badge-primary">New</span>
            <span class="badge badge-secondary">×</span>
          </li>
          <li class="list-group-item v-reply-mine">
            Dapibus ac facilisis in
            <span class="badge badge-primary">New</span>
            <span class="badge badge-secondary">×</span>
          </li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
    `,
    data: function(){
      return {
        message: null,
        imgFile: null,
      }
    },
    methods: {
      uploadSns: function(e){
        var header= {};
        var formData = new FormData();
        formData.append('content', this.message);
        
        if(this.imgFile){
          header.enctype = 'multipart/form-data',
          formData.append('image', this.imgFile);
        }
        axios.post('/v1/write',formData,{headers: header})
          .then($.proxy(function(res){
            console.log(res);
            this.imgFile = null;
          },this))
          .catch(function(err){
            console.log(err)
            this.imgFile = null;
          });
        
      },
      uploadFile: function(e){
        this.imgFile = $(e.currentTarget).prop("files")[0];
        console.log(this.imgFile);
        console.log(this.imgFile.name);
        console.log(this.imgFile.size);
      }
    },
    computed: {

    },
    beforeRouteEnter (to, from, next) {
      next();
    },
    beforeRouteLeave (to, from, next) {
      next();
    }
};
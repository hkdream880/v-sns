var TimeLine = { 
  template: `
    <div class="v-home">
      <form>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">SNS</span>
          </div>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div>
        <div class="input-group">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04">
            <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
          </div>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
          </div>
        </div>
      </form>

      <div class="card v-time-line-wraper" >
        <img src="./img/coffie.jpg" class="card-img-top" alt="...">
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

      <div class="card v-time-line-wraper" >
        <img src="./img/coffie.jpg" class="card-img-top" alt="...">
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
        value: ''
      }
    },
    methods: {
      test1: function(){
        console.log('test')
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
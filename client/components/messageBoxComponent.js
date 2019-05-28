var MessageBox = {
  template : `
  <div class="v-home-chat">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Fluid jumbotron</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <img src="./img/coffie.jpg" class="rounded v-profile" alt="...">
        <span class="badge badge-dark">이현국</span>
        Cras justo odio
        <button type="button" class="btn btn-danger v-del-chat v-chat-btn" data-toggle="modal" data-target="#exampleModal">나가기</button>
        <button type="button" class="btn btn-primary v-enter-chat v-chat-btn">
          입장 <span class="badge badge-light">4</span>
        </button>
      </li>
      <li class="list-group-item">
        <img src="./img/coffie.jpg" class="rounded v-profile" alt="...">
        <span class="badge badge-dark">이현국</span>
        Cras justo odio
        <button type="button" class="btn btn-danger v-del-chat v-chat-btn" data-toggle="modal" data-target="#exampleModal">나가기</button>
        <button type="button" class="btn btn-primary v-enter-chat v-chat-btn">
          입장 <span class="badge badge-light">4</span>
        </button>
      </li>
    </ul>


    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
}
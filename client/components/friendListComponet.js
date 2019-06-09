var FriendsList = {
  template : `
  <div class="v-home">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Fluid jumbotron</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>
    <div class="v-friend-tab-list">
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
      </ul>
    </div>
    <div class="v-friend-list">
      <ul class="list-group">
        <li class="list-group-item">
          <img src="./common/img/coffie.jpg" class="rounded v-profile" alt="...">
          Dapibus ac facilisis in
          <button type="button" class="btn btn-primary">메세지</button>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
            삭제
          </button>
        </li>
        <li class="list-group-item">
          <img src="./common/img/coffie.jpg" class="rounded v-profile" alt="...">
          Dapibus ac facilisis in
          <button type="button" class="btn btn-primary">메세지</button>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
            삭제
          </button>
        </li>
        <li class="list-group-item">
          <img src="./common/img/coffie.jpg" class="rounded v-profile" alt="...">
          Dapibus ac facilisis in
          <button type="button" class="btn btn-primary">메세지</button>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
            삭제
          </button>
        </li>
      </ul>
    </div>

    
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
            삭제하시겠습니까?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
}
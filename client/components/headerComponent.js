var Header = {
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/timeLine" class="nav-link">Time Line</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/message" class="nav-link">Message Box</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/friends" class="nav-link">Friends List</router-link>
      </li>
    </ul>
  </div>
</nav>
  `,
}
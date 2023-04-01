<template>
  <nav class="navbar navbar-expand-lg nav-custom px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="https://freesvg.org/img/bird-orange.png" height="45" class="me-3" />
        <h1 class="text-light">Tweeter</h1>
      </div>
    </router-link>
    <Searchbar />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
import Searchbar from "./Searchbar.vue";
export default {
  setup() {
    return {}
  },
  components: { Login, Searchbar }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-custom {
  background-image: linear-gradient(to right, #39C4C6, #c4eff0 80%, #39C4C6);
  margin-bottom: 3em;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.search-input {
  position: absolute;
  right: 80px
}
</style>

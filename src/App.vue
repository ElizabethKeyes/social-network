<template>
  <header>
  </header>
  <main class="container-fluid overflow-hidden">
    <section class="row">
      <div class="col-2">
        <!-- insert sidebar here -->
      </div>
      <div class="col-10 pe-0">
        <Navbar />
        <router-view />
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

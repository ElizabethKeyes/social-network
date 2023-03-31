<template>
  <div class="sidebar-card">
    <div class="d-flex justify-content-center">
      <img :src="user.picture" :alt="'a photo of ' + user.name" class="profile-pic">
    </div>
    <h5 v-if="user.class">{{ user.class }}</h5>
    <h4 class="fw-bold mb-3">{{ user.name }}</h4>
    <h6><i class="mdi mdi-github fs-4 me-2"></i>Github</h6>
    <h6><i class="mdi mdi-linkedin fs-4 me-2"></i>LinkedIn</h6>
    <h6><i class="mdi mdi-file-document fs-4 me-2"></i>Resume</h6>

  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      user: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.sidebar-card {
  background-color: white;
  filter: drop-shadow(0px 0px 2px black);
  padding: 1em;
  padding-top: 5em;
  min-height: 75vh;
  border-bottom-right-radius: 1px
}

.profile-pic {
  height: 15vh;
  width: 15vh;
  border-radius: 100%;
  margin-bottom: 2em;
}
</style>
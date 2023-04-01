<template>
  <div class="sidebar-card">
    <div class="d-flex justify-content-center">
      <!-- <router-link :to="{ name: 'Profile', params: { profileId: user.id } }"> -->
      <img :src="account?.picture" :alt="'a photo of ' + account?.name" class="profile-pic">
      <!-- </router-link> -->
    </div>
    <h5 v-if="account?.class">{{ account?.class }}</h5>
    <h4 class="fw-bold mb-3">{{ account?.name }}</h4>
    <div class="d-flex flex-column">
      <a :href="account?.github" class="text-dark"><i class="mdi mdi-github fs-4 me-2"></i>Github</a>
      <a :href="account?.linkedin" class="text-dark"><i class="mdi mdi-linkedin fs-4 me-2"></i>LinkedIn</a>
      <a :href="account?.resume" class="text-dark"><i class="mdi mdi-file-document fs-4 me-2"></i>Resume</a>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.sidebar-card {
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgb(91, 89, 89));
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
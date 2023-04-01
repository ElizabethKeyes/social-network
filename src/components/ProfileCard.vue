<template>
  <div class="profile-card">
    <section class="row">
      <div class="col-12">
        <img :src="profile?.coverImg" :alt="profile?.name + `'s cover image`" class="cover-img">
      </div>
      <div class="col-2">
        <img :src="profile?.picture" :alt="'a photo of ' + profile?.name" class="profile-pic">
        <i v-if="profile?.graduated" class="mdi mdi-account-school text-secondary fs-3 graduate-icon"></i>
      </div>
      <div class="col-12 d-flex justify-content-end pe-5">
        <button class="btn" type="button" @click="goToGithub(profile?.github)"><i
            class="mdi mdi-github fs-2"></i></button>
        <button class="btn" type="button"><i class="mdi mdi-linkedin fs-2"></i></button>
        <button class="btn" type="button"><i class="mdi mdi-file-document fs-2"></i></button>
      </div>
      <div class="col-11 card-content">
        <h5 class="mb-0">{{ profile?.class }}</h5>
        <h4>{{ profile?.name }}</h4>
        <p>{{ profile?.bio }}</p>
      </div>
    </section>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const router = useRouter()
    return {
      router,
      profile: computed(() => AppState.activeProfile),

      goToGithub(url) {
        router.currentRoute = url
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-card {
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgb(91, 89, 89));
  margin: 1em;
  margin-left: 2.5em;
  min-height: 45vh;
  margin-bottom: 3em;
}

.cover-img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
  position: relative;
}

.profile-pic {
  border-radius: 100%;
  border: solid 2px #39C4C6;
  position: absolute;
  bottom: 150px;
  left: 20px;
  height: 15vh;
  width: 15vh;
}

.graduate-icon {
  border-radius: 100%;
  background-color: white;
  border: solid 1px #39C4C6;
  position: absolute;
  bottom: 150px;
  left: 110px;
  width: 5vh;
  text-align: center;
}

.card-content {
  margin-top: 1em;
  padding-left: 2.5em;
  padding-right: 2.5em;
  padding-bottom: 2.5em;

}
</style>
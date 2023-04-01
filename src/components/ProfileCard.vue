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
      <div class="col-12 d-flex justify-content-end pe-5 socials-col">
        <a v-if="profile?.github" :href="profile?.github"><i class="me-2 text-dark mdi mdi-github fs-2"></i></a>
        <a v-if="profile?.linkedin" :href="profile?.linkedin"><i class="me-2 text-dark mdi mdi-linkedin fs-2"></i></a>
        <a v-if="profile?.resume" :href="profile?.resume"><i class="me-2 text-dark mdi mdi-file-document fs-2"></i></a>
      </div>
      <div class="col-11 card-content">
        <h6 class="mb-0">{{ profile?.class }}</h6>
        <h3>{{ profile?.name }}</h3>
        <p>{{ profile?.bio }}</p>
      </div>
      <button v-if="profile?.id == account?.id" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
        class="btn btn-outline-light">Edit</button>
    </section>
  </div>
  <EditProfileModal />
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import EditProfileModal from './EditProfileModal.vue'

export default {
  setup() {
    const router = useRouter()
    return {
      router,
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),

      goToGithub(url) {
        router.currentRoute = url
      }
    }
  },
  components: { EditProfileModal }
}
</script>


<style lang="scss" scoped>
.profile-card {
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgb(91, 89, 89));
  margin: 1em;
  margin-left: 2.5em;
  min-height: 45vh;
  margin-bottom: 1.25em;
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
  object-fit: cover;
  object-position: center;
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

.socials-col {
  min-height: 6vh;
  padding-top: .25em
}

.btn-outline-light {
  color: #39C4C6;
  border: solid 1px #39C4C6;
  margin-right: 1em;
  width: 5vw;
  position: absolute;
  bottom: 10px;
  right: -5px
}

.btn-outline-light:hover {
  color: white;
  background-color: #39C4C6;
}
</style>
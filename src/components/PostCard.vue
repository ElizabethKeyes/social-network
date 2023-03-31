<template>
  <div class="post-card">
    <section class="row">
      <div class="col-2 ps-5 pt-3 d-flex justify-content-center">
        <router-link :to="{ name: 'Profile', params: { profileId: p.creator.id } }">
          <img class="profile-pic" :src="p.creator.picture" :alt="p.creator.name">
        </router-link>
      </div>
      <div class="col-10 ps-4 d-flex flex-column justify-content-around">
        <h4>{{ p.creator.name }}</h4>
        <h6 class="text-dark lighten-50">{{ p.createdAt }}<span v-if="p.creator.graduated"><i
              class="mdi mdi-account-school ms-2"></i></span>
        </h6>
      </div>
      <div class="col-11 px-4 ms-3 mt-2">
        <p class="mb-0">{{ p.body }}</p>
      </div>
      <div class="col-12">
        <img v-if="p.imgUrl" :src="p.imgUrl" class="post-image">
      </div>
      <div class="col-12 pe-4 d-flex justify-content-end">
        <h6 class="mt-2 me-1">{{ p.likes.length }}</h6> <i class="mdi mdi-heart fs-3"></i>
      </div>
    </section>
  </div>
</template>


<script>
import { Post } from "../models/Post.js";

export default {
  props: {
    p: {
      type: Post,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 10vh;
  width: 10vh;
  border-radius: 100%
}

.post-card {
  margin: 1em;
  // padding: 1em;
  background-color: white;
  border-radius: 1px;
  filter: drop-shadow(1px 1px 2px black);
}

.post-image {
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
}
</style>
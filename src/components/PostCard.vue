<template>
  <div class="post-card">
    <section class="row">
      <div class="col-2 d-flex justify-content-center">
        <img class="profile-pic" :src="p.creator.picture" alt="">
      </div>
      <div class="col-10 d-flex flex-column justify-content-around">
        <h4>{{ p.creator.name }}</h4>
        <h6 class="text-dark lighten-50">{{ p.createdAt }}<span v-if="p.creator.graduated"><i
              class="mdi mdi-account-school ms-2"></i></span>
        </h6>
      </div>
      <div class="col-11 px-4 ms-3 mt-2">
        <p class="mb-0">{{ p.body }}</p>
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
  padding: 1em;
  background-color: white;
  border-radius: 1px;
  filter: drop-shadow(1px 1px 2px black);
}
</style>
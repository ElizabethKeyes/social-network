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
        <h6 class="mt-2 me-1">{{ p.likes.length }}</h6> <i :class="{ 'text-danger': p.likeIds.includes(userId) }"
          class="mdi mdi-heart fs-3 like-button" @click="likePost(p.id)"></i>
      </div>
    </section>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    p: {
      type: Post,
      required: true
    }
  },
  setup() {

    return {
      likes: computed(() => AppState.likeIds),
      userId: computed(() => AppState.account.id),

      async likePost(postId) {
        try {
          if (AppState.account.id) {
            await postsService.likePost(postId)
          } else {
            Pop.error('You must be logged in to like posts')
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
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
  margin-left: 2.5em;
  background-color: white;
  border-radius: 1px;
  filter: drop-shadow(0px 0px 2px black);
}

.post-image {
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
}

.like-button:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
<template>
  <div class="post-card">
    <section class="row">
      <div class="col-2 ps-5 pt-3 d-flex justify-content-center">
        <router-link :to="{ name: 'Profile', params: { profileId: p.creator.id } }">
          <img class="profile-pic" :src="p.creator.picture" :alt="p.creator.name">
        </router-link>
      </div>
      <div class="col-10 mt-3 ps-4 d-flex flex-column justify-content-around">
        <button v-if="userId == p.creator.id" @click="deletePost(p.id)" class="btn delete-button" title="Delete Post"
          type="button"><i class="mdi mdi-delete-outline text-danger fs-4"></i></button>
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
          class="mdi mdi-heart fs-3 like-button" @click="likePost(p.id)" :title="p?.likeNames"></i>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from "vue";
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
  setup(props) {


    function getLikeNames() {
      const likeNames = []
      for (let i = 0; i < props.p.likes.length; i++) {
        likeNames.push(' ' + props.p.likes[i].name)
      }
      props.p.likeNames = likeNames
    }

    onMounted(() => {
      getLikeNames()
    })
    return {
      likes: computed(() => AppState.likeIds),
      userId: computed(() => AppState.account.id),
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      postLikers: computed(() => AppState.postLikers),

      async likePost(postId) {
        try {
          if (AppState.account.id) {
            await postsService.likePost(postId)
            getLikeNames()
          } else {
            Pop.error('You must be logged in to like posts')
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async deletePost(postId) {
        try {
          if (await Pop.confirm("Are you sure you'd like to delete this post?", "This can't be undone!", "Yes, I'm sure", "warning")) {
            await postsService.deletePost(postId)
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
  border-radius: 100%;
  object-position: center;
  object-fit: cover
}

.post-card {
  margin: 1em;
  margin-left: 2.5em;
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgb(91, 89, 89));
  position: relative
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

.delete-button {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
<template>
  <div class="new-post-card row">
    <div class="col-2 px-0 pt-3 d-flex justify-content-center">
      <router-link v-if="user.id" :to="{ name: 'Profile', params: { profileId: user?.id } }">
        <img :src="user.picture" :alt="'a photo of ' + user.name" class="profile-pic">
      </router-link>
    </div>
    <div class="col-10">
      <form @submit.prevent="createPost()">
        <textarea v-model="editable.body" placeholder="Share what's happening" class="form-control my-text-area" rows="10"
          required maxlength="1000"></textarea>
        <input type="url" placeholder="Paste URL here" class="form-control photo-input" v-model="editable.imgUrl"
          v-if="photoInput == true">
        <div class="d-flex justify-content-between mb-2">
          <button class="btn" type="button" @click="togglePhotoInput()"><i
              class="mdi mdi-image-multiple blue-text me-1"></i>Photo/Video</button>
          <button class="btn" type="submit"><i class="mdi mdi-send blue-text me-2"></i>Post</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const editable = ref({})


    return {
      editable,
      user: computed(() => AppState.account),
      photoInput: computed(() => AppState.photoInput),
      posts: computed(() => AppState.posts),

      async createPost() {
        try {
          const postData = editable.value
          const form = window.event.target
          await postsService.createPost(postData)
          form.reset()
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      togglePhotoInput() {
        try {
          postsService.togglePhotoInput()
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
.new-post-card {
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgb(91, 89, 89));
  margin: 1em;
  margin-left: 2.5em;
  margin-bottom: 2.5em;
  z-index: 2;
}

.profile-pic {
  height: 10vh;
  width: 10vh;
  border-radius: 100%;
  margin-top: .75em;
  object-position: center;
  object-fit: cover;
}

.my-text-area {
  max-height: 15vh;
  margin-top: 1.5em;
  margin-bottom: 1em;
  border: dashed #39C4C6 2px
}

.blue-text {
  color: #39C4C6
}

.photo-input {
  border: dashed #39C4C6 2px;
  margin-bottom: .5em
}
</style>
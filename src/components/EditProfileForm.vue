<template>
  <form @submit.prevent="updateProfileInfo()">
    <div class="modal-content">
      <div class="modal-header bg-custom">
        <h5 class="modal-title text-light fw-bold" id="exampleModalLabel">Edit Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row">
        <div class="col-12">
          <img :src="account?.coverImg" :alt="account?.name + `'s cover image`" class="cover-img">
          <div class="overlay-input">
            <input type="url" placeholder="Image url..." class="form-control cover-img-input" v-model="editable.coverImg">
            <label>Cover Image url</label>
          </div>
        </div>
        <div>
          <img :src="account?.picture" :alt="'a picture of' + account?.name" class="profile-pic">
        </div>
        <div class="col-7 ps-3 mt-2">
          <h4 class="account-name">{{ account?.name }}</h4>
          <label class="ms-2 mt-4">Profile Image url</label>
          <input type="url" class="form-control ms-2" placeholder="Image url..." v-model="editable.picture">
          <section class="row">
            <div class="col-8">
              <label class="ms-2 mt-2">Attending Class</label>
              <input type="text" class="form-control ms-2" placeholder="class..." v-model="editable.class">
            </div>
            <div class="col-4">
              <label class="mt-2">Graduated?</label>
              <input type="checkbox" v-model="editable.graduated">
            </div>
          </section>
        </div>
        <div class="col-5 pe-4 mt-2">
          <label>Github</label>
          <input type="text" class="form-control" placeholder="url..." v-model="editable.github">
          <label>LinkedIn</label>
          <input type="url" class="form-control" placeholder="url..." v-model="editable.linkedin">
          <label>Resume</label>
          <input type="url" class="form-control" placeholder="url..." v-model="editable.resume">
        </div>
        <div class="col-12 d-flex justify-content-center">
          <textarea class="form-control bio-input" placeholder="Tell us about yourself" cols="30" rows="4"
            v-model="editable.bio"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-light" data-bs-dismiss="modal">Submit Changes</button>
      </div>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";

export default {
  setup() {
    const editable = ref({ ...AppState.account });

    return {
      editable,
      account: computed(() => AppState.account),

      async updateProfileInfo() {
        try {
          const profileData = editable.value;
          await profilesService.updateProfileInfo(profileData);
        }
        catch (error) {
          logger.log(error);
          Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-custom {
  background-image: linear-gradient(to right, #39C4C6, #c4eff0 80%, #39C4C6);
}

.cover-img {
  width: 100%;
  height: 15vh;
  object-fit: cover;
  object-position: center;
  position: relative;
}

.modal-body {
  padding: 0px
}

.profile-pic {
  border-radius: 100%;
  height: 10vh;
  width: 10vh;
  position: absolute;
  top: 85px;
  left: 25px;
  object-fit: cover;
  object-position: center;
}

.account-name {
  margin-left: 4.5em;
}

.bio-input {
  margin-top: 1em;
  width: 95%
}

.btn-light {
  background-color: #39C4C6;
  border: solid 1px #39C4C6;
}

.cover-img-input {
  width: 80%
}

.overlay-input {
  position: absolute;
  top: 15px;
  right: -20px
}
</style>
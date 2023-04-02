<template>
  <section class="row">
    <div class="col-9">
      <ProfileCard />
      <CreatePostCard v-if="profile?.id == user?.id" />
      <div class="div" v-for="p in posts" :key="p.id">
        <PostCard :p="p" />
      </div>
    </div>
    <div class="col-3 promo-col">
      <div class="div d-flex justify-content-end" v-for="promo in promos" :key="promo.title">
        <Promos :promo="promo" />
      </div>
    </div>
    <div class="col-9 d-flex justify-content-around mb-4 mt-3">
      <button :class="{ disabled: previousPage == null }" @click="changePage(previousPage)"
        class="btn btn-outline-dark">Previous Page</button>
      <button :class="{ disabled: nextPage == null }" @click="changePage(nextPage)" class="btn btn-outline-dark">Next
        Page</button>
    </div>
  </section>
</template>


<script>
import { computed, onMounted } from "vue";
import Promos from "../components/Promos.vue";
import { AppState } from "../AppState.js";
import { promosService } from "../services/PromosService.js";
import { profilesService } from '../services/ProfilesService.js'
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import PostCard from "../components/PostCard.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { postsService } from "../services/PostsService.js";
import CreatePostCard from "../components/CreatePostCard.vue";

export default {
  setup() {
    const route = useRoute()

    async function getProfileById() {
      try {
        const profileId = route.params.profileId
        await profilesService.getProfileById(profileId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    async function getPostsByProfileId() {
      try {
        const profileId = route.params.profileId
        await postsService.getPostsByProfileId(profileId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      promosService.getPromos(),
        getProfileById(),
        getPostsByProfileId()
    })

    return {
      route,
      promos: computed(() => AppState.promos),
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      user: computed(() => AppState.account),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    };
  },
  components: { Promos, PostCard, ProfileCard, CreatePostCard }
}
</script>


<style lang="scss" scoped>
.promos {
  width: 100%;
  margin-bottom: 2em;
}

.promo-col {
  padding-left: 0px;
  padding-right: 20px;
  position: absolute;
  top: 100px;
  right: 12px;
  width: 23vw
}
</style>
<template>
  <section class="row">
    <div class="col-9">
      <h1 class="mx-4">People</h1>
      <div class="people-card" v-for="p in searchedProfiles" :key="p.id">

        <div>
          <router-link :to="{ name: 'Profile', params: { profileId: p.id } }">
            <img class="profile-pic" :src="p.picture" :alt="p.name">
          </router-link>
        </div>
        <div>
          <h5>{{ p.class }}</h5>
          <h2>{{ p.name }}</h2>
        </div>
      </div>
      <hr class="border border-dark border-1">
      <h1 class="mx-4">Posts</h1>
      <div class="post-card" v-for="p in posts" :key="p.id">
        <PostCard :p="p" />
      </div>
    </div>
    <div class="col-3 promo-col">
      <div class="d-flex justify-content-end" v-for="p in promos" :key="p.id">
        <Promos :promo="p" />
      </div>
    </div>
  </section>
</template>


<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Promos from "../components/Promos.vue";
import { promosService } from "../services/PromosService.js";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {

    onMounted(() => {
      promosService.getPromos()
    })
    return {
      searchedProfiles: computed(() => AppState.searchedProfiles),
      posts: computed(() => AppState.posts),
      promos: computed(() => AppState.promos),
      account: computed(() => AppState.account)
    };
  },
  components: { Promos, PostCard }
}
</script>


<style lang="scss" scoped>
.promo-col {
  padding-left: 0px;
  padding-right: 20px;
  position: absolute;
  top: 100px;
  right: 12px;
  width: 23vw
}

.people-card {
  background-color: white;
  filter: drop-shadow(0px 0px 7px rgb(91, 89, 89));
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  margin-left: 2em;
  margin-right: 1.3em;
  padding: .75em;
  display: flex;
  align-items: center;
  min-height: 15vh;
}

.profile-pic {
  height: 10vh;
  width: 10vh;
  border-radius: 100%;
  object-position: center;
  object-fit: cover;
  margin-right: 2em;
}
</style>
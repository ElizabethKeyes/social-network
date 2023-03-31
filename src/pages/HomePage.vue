<template>
  <section class="row">
    <div class="col-9" v-for="p in posts" :key="p.id">
      <PostCard :p="p" />
    </div>
    <div class="col-3 promo-col">
      <div class="div d-flex justify-content-end" v-for="promo in promos" :key="promo.title">
        <Promos :promo="promo" />
      </div>
    </div>
  </section>
</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js'
import { promosService } from '../services/PromosService.js'
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";
import Promos from "../components/Promos.vue";


export default {
  setup() {
    async function getAllPosts() {
      try {
        await postsService.getAllPosts();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }

    async function getPromos() {
      try {
        await promosService.getPromos()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getAllPosts(),
        getPromos()
    });
    return {
      posts: computed(() => AppState.posts),
      promos: computed(() => AppState.promos)
    };
  },
  components: { PostCard, Promos }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}



.promo-col {
  position: absolute;
  top: 100px;
  right: 0px
}
</style>

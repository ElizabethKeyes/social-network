<template>
  <section class="row">
    <div class="col-12">
      <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded account-picture" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
    <div class="col-6 px-4 mt-5" v-for="promo in promos">
      <img :src="promo?.banner" alt="" class="img-fluid">
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { promosService } from "../services/PromosService.js"
export default {
  setup() {
    async function getPromos() {
      try {
        await promosService.getPromos()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getPromos()
    })
    return {
      account: computed(() => AppState.account),
      promos: computed(() => AppState.promos)
    }
  }
}
</script>

<style scoped>
.account-picture {
  max-width: 100px;
}
</style>

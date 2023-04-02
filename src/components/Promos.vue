<template>
  <a :href="'https://www.' + promo?.linkURL" target="_blank" class="a-tag">
    <img :src="promo?.tall" :alt="promo?.title" class="promos">
  </a>
</template>


<script>
import { useRouter } from "vue-router";
import { Promo } from "../models/Promo.js";
import { router } from "../router.js";
import { logger } from "../utils/Logger.js";

export default {
  props: {
    promo: {
      type: Promo,
      required: true
    }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.promos {
  width: 80%;
  margin-bottom: 2em;
}

.a-tag {
  display: flex;
  justify-content: end;
  width: 300px;
}
</style>
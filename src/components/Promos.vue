<template>
  <img :src="promo?.tall" :alt="promo?.title" class="promos">
</template>


<script>
import { Promo } from "../models/Promo.js";

export default {
  props: {
    promo: {
      type: Promo,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.promos {
  width: 80%;
  margin-bottom: 2em;
}
</style>
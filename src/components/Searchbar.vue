<template>
  <div class="col-3 search-input">
    <form @submit.prevent="searchContent()">
      <input type="text" class="form-control" placeholder="Search" v-model="editable.query">
    </form>
  </div>
</template>


<script>
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";

export default {
  setup(
  ) {
    const editable = ref({})
    return {
      editable,

      async searchContent() {
        try {
          const form = window.event.target
          const query = editable.value.query
          window.location.href = "http://localhost:8080/#/searchResults"
          await postsService.searchContent(query)
          form.reset()
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
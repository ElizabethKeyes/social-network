<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { profilesService } from "../services/ProfilesService.js";
import Pop from "../utils/Pop.js";
import EditProfileForm from "./EditProfileForm.vue";

export default {
  setup() {
    return {
      account: computed(() => AppState.account),

    };
  },
  components: { EditProfileForm }
}
</script>


<style lang="scss" scoped></style>
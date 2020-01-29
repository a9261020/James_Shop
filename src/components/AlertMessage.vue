<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, index) in message"
      :key="index"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="removeMessage(index)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("alertMessageModules", ["message"])
  },
  methods: {
    ...mapActions("alertMessageModules", [
      "removeMessage",
      "removeMessageWithTiming"
    ])
  }
};
</script>

<style scope>
.message-alert {
  max-width: 55%;
  position: fixed;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>

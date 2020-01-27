<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, index) in 1"
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
export default {};
</script>

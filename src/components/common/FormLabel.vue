<template>
  <label class="form-label fw-bold bg-warning p-2 d-block rounded">
    <slot></slot>
  </label>
</template>

<script setup>
  // No props needed as we're using slots
</script>

<style scoped>
  .form-label {
    margin-bottom: 0;
    min-width: 100%;
  }
</style>

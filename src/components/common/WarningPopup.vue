<template>
  <BasePopup
    :is-open="isOpen"
    :title="title"
    :width="width"
    :max-width="maxWidth"
    :show-footer="true"
    :show-confirm-button="true"
    :show-cancel-button="false"
    :confirm-text="okText"
    @close="close"
    @confirm="close"
  >
    <div class="warning-popup">
      <div class="warning-icon">
        <i class="bi bi-exclamation-triangle-fill text-warning"></i>
      </div>
      <div class="message">
        <slot>{{ message }}</slot>
      </div>
    </div>
  </BasePopup>
</template>

<script setup>
  import BasePopup from './BasePopup.vue'

  defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '警告'
    },
    message: {
      type: String,
      default: '注意が必要です。'
    },
    okText: {
      type: String,
      default: 'OK'
    },
    width: {
      type: String,
      default: '450px'
    },
    maxWidth: {
      type: String,
      default: '600px'
    }
  })

  const emit = defineEmits(['close'])

  function close() {
    emit('close')
  }
</script>

<style scoped>
  .warning-popup {
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .warning-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .message {
    text-align: center;
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }
</style>

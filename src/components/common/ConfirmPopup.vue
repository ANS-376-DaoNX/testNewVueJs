<template>
  <BasePopup
    :is-open="isOpen"
    :title="title"
    :width="width"
    :max-width="maxWidth"
    :show-footer="true"
    :show-confirm-button="true"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    @close="close"
    @confirm="confirm"
    @cancel="cancel"
  >
    <div class="confirm-popup">
      <div class="message">
        <slot>{{ message }}</slot>
      </div>
    </div>
  </BasePopup>
</template>

<script setup>
  import BasePopup from './BasePopup.vue'

  // eslint-disable-next-line
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '確認'
    },
    message: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '確認'
    },
    cancelText: {
      type: String,
      default: 'キャンセル'
    },
    width: {
      type: String,
      default: '400px'
    },
    maxWidth: {
      type: String,
      default: '600px'
    }
  })

  const emit = defineEmits(['close', 'confirm', 'cancel'])

  function close() {
    emit('close')
  }

  function confirm() {
    emit('confirm')
  }

  function cancel() {
    emit('cancel')
  }
</script>

<style scoped>
  .confirm-popup {
    padding: 0.5rem 0;
  }

  .message {
    text-align: center;
    font-size: 1.1rem;
    padding: 1rem 0;
  }
</style>

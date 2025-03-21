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
    <div class="error-popup">
      <div class="error-icon">
        <i class="bi bi-exclamation-triangle-fill text-danger"></i>
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
      default: 'エラー'
    },
    message: {
      type: String,
      default: '処理中にエラーが発生しました。入力内容をご確認ください。'
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
  .error-popup {
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .message {
    text-align: center;
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }
</style>

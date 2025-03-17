<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup-overlay" @click.self="closeOnClickOutside ? close() : null">
      <div class="popup-content" :style="popupStyles">
        <div class="popup-header" v-if="showHeader">
          <h5 class="popup-title">{{ title }}</h5>
          <button v-if="showClose" type="button" class="popup-close" @click="close">×</button>
        </div>
        <div class="popup-body">
          <slot></slot>
        </div>
        <div class="popup-footer" v-if="showFooter">
          <slot name="footer">
            <button v-if="showConfirmButton" type="button" class="btn btn-primary me-2" @click="confirm">
              {{ confirmText }}
            </button>
            <button v-if="showCancelButton" type="button" class="btn btn-secondary" @click="cancel">
              {{ cancelText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: false
    },
    showCancelButton: {
      type: Boolean,
      default: true
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
      default: '80%'
    },
    maxWidth: {
      type: String,
      default: '800px'
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['close', 'confirm', 'cancel'])

  const popupStyles = computed(() => ({
    width: props.width,
    maxWidth: props.maxWidth
  }))

  const close = () => {
    emit('close')
  }

  const confirm = () => {
    emit('confirm')
    close()
  }

  const cancel = () => {
    emit('cancel')
    close()
  }
</script>

<style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
  }

  .popup-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    animation: popup-fade 0.2s ease-out;
  }

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #007bff;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .popup-title {
    margin: 0;
    font-size: 1.25rem;
  }

  .popup-close {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 0.5rem;
    line-height: 1;
  }

  .popup-body {
    padding: 1rem;
    overflow-y: auto;
    max-height: calc(90vh - 140px);
  }

  .popup-footer {
    padding: 1rem;
    border-top: 1px solid #dee2e6;
    display: flex;
    justify-content: flex-end;
  }

  @keyframes popup-fade {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive styling */
  @media (max-width: 768px) {
    .popup-content {
      width: 90%;
      max-height: 80vh;
    }

    .popup-body {
      max-height: calc(80vh - 140px);
    }
  }
</style>

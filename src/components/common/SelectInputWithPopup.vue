<template>
  <div class="select-input-with-popup">
    <div class="input-group">
      <select
        class="form-select"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
      >
        <option value="">{{ placeholder || '選択してください' }}</option>
        <option v-for="item in items" :key="item.code" :value="item.code">
          {{ item.name }}
        </option>
      </select>
      <button class="btn btn-outline-secondary" type="button" @click="openSelectionPopup">
        <i class="bi bi-list"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { usePopup } from '@/composables/usePopup'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    popupTitle: {
      type: String,
      default: '選択'
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const { openSearchPopup } = usePopup()

  const openSelectionPopup = () => {
    if (props.disabled) return

    openSearchPopup({
      title: props.popupTitle,
      items: props.items,
      onSelect: (item) => {
        emit('update:modelValue', item.code)
      },
      config: {
        width: '500px',
        maxWidth: '700px'
      }
    })
  }
</script>

<style scoped>
  .select-input-with-popup {
    position: relative;
  }
</style>

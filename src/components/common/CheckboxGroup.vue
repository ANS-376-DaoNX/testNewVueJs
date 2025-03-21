<template>
  <div class="checkbox-group-wrapper">
    <div class="form-group">
      <label v-if="label" class="form-label">{{ label }}</label>
      <div class="checkbox-items" :class="{ 'is-invalid': error }">
        <BaseCheckbox
          v-for="option in options"
          :key="option.value"
          :id="`${name}-${option.value}`"
          :label="option.label"
          :model-value="isSelected(option.value)"
          :disabled="disabled"
          @update:model-value="updateSelection(option.value, $event)"
        />
      </div>
      <div v-if="error" class="invalid-feedback d-block">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseCheckbox from './BaseCheckbox.vue'

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      required: true,
      validator: (options) => options.every((option) => 'value' in option && 'label' in option)
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])

  // Check if a value is in the selected array
  const isSelected = (value) => {
    return props.modelValue.includes(value)
  }

  // Toggle selection for a value
  const updateSelection = (value, isChecked) => {
    const selected = [...props.modelValue]
    if (isChecked) {
      if (!selected.includes(value)) {
        selected.push(value)
      }
    } else {
      const index = selected.indexOf(value)
      if (index !== -1) {
        selected.splice(index, 1)
      }
    }
    emit('update:modelValue', selected)
  }
</script>

<style scoped>
  .checkbox-group-wrapper {
    margin-bottom: 1rem;
  }

  .checkbox-items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .is-invalid .form-check-input {
    border-color: #dc3545;
  }

  .invalid-feedback {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
</style>

<template>
  <div class="radio-group-wrapper">
    <div class="form-group">
      <label v-if="label" class="form-label">{{ label }}</label>
      <div class="radio-items" :class="{ 'is-invalid': error }">
        <BaseRadio
          v-for="option in options"
          :key="option.value"
          :id="`${name}-${option.value}`"
          :name="name"
          :value="option.value"
          :label="option.label"
          :model-value="modelValue"
          :disabled="disabled"
          @update:model-value="$emit('update:modelValue', $event)"
        />
      </div>
      <div v-if="error" class="invalid-feedback d-block">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseRadio from './BaseRadio.vue'

  defineProps({
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
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

  defineEmits(['update:modelValue'])
</script>

<style scoped>
  .radio-group-wrapper {
    margin-bottom: 1rem;
  }

  .radio-items {
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

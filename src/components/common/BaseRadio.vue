<template>
  <div class="radio-wrapper">
    <div class="form-check">
      <input
        type="radio"
        class="form-check-input"
        :class="{ 'form-error': error }"
        :id="id"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
        :disabled="disabled"
        ref="inputElement"
      />
      <label class="form-check-label" :for="id">{{ label }}</label>
    </div>
    <div v-if="error" ref="tooltip" class="error-tooltip">
      {{ error }}
      <div class="tooltip-arrow"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    id: {
      type: String,
      required: true
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

  const inputElement = ref(null)
  const tooltip = ref(null)

  // Show tooltip on hover
  const showTooltip = () => {
    if (props.error && tooltip.value) {
      tooltip.value.style.display = 'block'
    }
  }

  // Show tooltip when input is focused and has error
  const showTooltipOnFocus = () => {
    if (props.error) {
      showTooltip()
    }
  }

  // Hide tooltip
  const hideTooltip = () => {
    if (tooltip.value) {
      tooltip.value.style.display = 'none'
    }
  }

  // Update tooltip visibility when error state changes
  watch(
    () => props.error,
    () => {
      // The tooltip visibility is handled by mouse/focus events
    }
  )

  onMounted(() => {
    if (inputElement.value) {
      inputElement.value.addEventListener('mouseenter', showTooltip)
      inputElement.value.addEventListener('mouseleave', hideTooltip)
      inputElement.value.addEventListener('focus', showTooltipOnFocus)
      inputElement.value.addEventListener('blur', hideTooltip)
    }
  })
</script>

<style scoped>
  .radio-wrapper {
    position: relative;
    display: inline-block;
  }

  .form-error {
    border-color: #dc3545;
  }

  .form-error:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
  }

  .error-tooltip {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #dc3545;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    z-index: 1000;
    white-space: nowrap;
    display: none;
  }

  .tooltip-arrow {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #dc3545;
  }
</style>

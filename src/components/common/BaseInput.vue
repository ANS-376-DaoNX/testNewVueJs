<template>
  <div class="input-wrapper">
    <input
      :type="type"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
  defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  defineEmits(['update:modelValue'])
</script>

<style scoped>
  .input-wrapper {
    width: 100%;
  }
</style>

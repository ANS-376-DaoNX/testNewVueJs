<template>
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
</template>

<script setup>
  defineProps({
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
    }
  })

  defineEmits(['update:modelValue'])
</script>

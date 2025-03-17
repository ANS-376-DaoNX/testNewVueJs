<template>
  <div class="search-input-container">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
      />
      <button class="btn btn-outline-secondary" type="button" @click="togglePopup">
        <i class="bi bi-search"></i>
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
    placeholder: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    popupTitle: {
      type: String,
      default: '検索'
    },
    extraColumnName: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue', 'search', 'select'])

  const { openSearchPopup } = usePopup()

  // Toggle popup visibility
  const togglePopup = () => {
    console.log('Opening popup with items:', props.items)

    // Trigger initial search to populate the list
    emit('search', '')

    // Open search popup with current items
    openSearchPopup({
      title: props.popupTitle,
      items: props.items,
      extraColumnName: props.extraColumnName,
      onSearch: (keyword) => {
        console.log('Searching with keyword:', keyword)
        emit('search', keyword)
      },
      onSelect: (item) => {
        console.log('Item selected:', item)
        emit('select', item)
        emit('update:modelValue', item.code)
      },
      onClose: () => {
        console.log('Popup closed')
      }
    })
  }
</script>

<style scoped>
  .search-input-container {
    position: relative;
  }
</style>

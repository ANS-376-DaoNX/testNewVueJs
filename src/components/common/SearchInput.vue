<template>
  <div class="search-input-wrapper">
    <input
      type="text"
      :class="['form-control', { 'form-error': error }]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      ref="inputElement"
      @mousemove="updateTooltipPosition"
    />
    <button class="btn btn-primary btn-search" type="button" @click="openModal" :disabled="disabled">
      <i class="bi bi-search"></i>
    </button>
    <div v-if="error" class="global-tooltip-container" ref="tooltipContainer" :style="containerStyle">
      <div class="error-tooltip" ref="tooltip">
        {{ error || '入力してください' }}
        <div class="tooltip-arrow"></div>
      </div>
    </div>
    <SearchPopup
      v-if="showModal"
      :is-open="showModal"
      :title="popupTitle"
      :items="items"
      @close="closeModal"
      @search="handleSearch"
      @select="selectItem"
    />
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, computed } from 'vue'
  import SearchPopup from './SearchPopup.vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
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
    popupTitle: {
      type: String,
      default: '検索'
    },
    error: {
      type: [String, Boolean],
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue', 'search', 'select'])

  const showModal = ref(false)
  const inputElement = ref(null)
  const tooltip = ref(null)
  const tooltipContainer = ref(null)
  const mouseX = ref(0)
  const tooltipPosition = ref({ x: 0, y: 0 })

  const containerStyle = computed(() => {
    return {
      left: `${tooltipPosition.value.x}px`,
      top: `${tooltipPosition.value.y}px`
    }
  })

  const updateTooltipPosition = (event) => {
    if (inputElement.value) {
      const rect = inputElement.value.getBoundingClientRect()
      const relativeX = event.clientX - rect.left

      // Tính vị trí tuyệt đối trên viewport
      const absoluteX = event.clientX

      // Lưu vị trí chuột để dùng khi hiển thị tooltip
      mouseX.value = relativeX

      // Cập nhật vị trí tooltip (vị trí tuyệt đối trên màn hình)
      tooltipPosition.value = {
        x: absoluteX,
        y: rect.top - 50 // Tooltip sẽ hiển thị phía trên input
      }
    }
  }

  const openModal = () => {
    showModal.value = true
    // Trigger search with current value
    if (props.modelValue) {
      emit('search', props.modelValue)
    } else {
      emit('search', '')
    }
  }

  const closeModal = () => {
    showModal.value = false
  }

  const handleSearch = (keyword) => {
    emit('search', keyword)
  }

  const selectItem = (item) => {
    showModal.value = false
    emit('select', item)
  }

  // Show tooltip on hover
  const showTooltip = () => {
    if (props.error && tooltipContainer.value) {
      tooltipContainer.value.style.display = 'block'

      // Tính toán vị trí ban đầu của tooltip khi hiển thị
      if (inputElement.value) {
        const rect = inputElement.value.getBoundingClientRect()
        mouseX.value = rect.width / 2

        // Đặt vị trí giữa input
        tooltipPosition.value = {
          x: rect.left + rect.width / 2,
          y: rect.top - 50
        }
      }
    }
  }

  // Hide tooltip
  const hideTooltip = () => {
    if (tooltipContainer.value) {
      tooltipContainer.value.style.display = 'none'
    }
  }

  // Show tooltip when input is focused and has error
  const showTooltipOnFocus = () => {
    if (props.error) {
      showTooltip()
    }
  }

  // Hide tooltip when input loses focus
  const hideTooltipOnBlur = () => {
    hideTooltip()
  }

  // Watch for error changes
  watch(
    () => props.error,
    () => {
      // Không làm gì khi error thay đổi, để các sự kiện mouse/focus xử lý hiển thị tooltip
    }
  )

  onMounted(() => {
    if (inputElement.value) {
      inputElement.value.addEventListener('mouseenter', showTooltip)
      inputElement.value.addEventListener('mouseleave', hideTooltip)
      inputElement.value.addEventListener('focus', showTooltipOnFocus)
      inputElement.value.addEventListener('blur', hideTooltipOnBlur)

      // Tính toán vị trí ban đầu
      const rect = inputElement.value.getBoundingClientRect()
      tooltipPosition.value = {
        x: rect.left + rect.width / 2,
        y: rect.top - 50
      }
    }
  })
</script>

<style scoped>
  .search-input-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: auto;
  }

  .form-control {
    flex: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .btn-search {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-error {
    border-color: #dc3545;
    background-image: none;
  }

  .form-error:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
  }

  .global-tooltip-container {
    position: fixed; /* Sử dụng fixed thay vì absolute */
    transform: translateX(-50%);
    display: none;
    z-index: 9999; /* Z-index cao hơn để đảm bảo hiển thị trên các phần tử khác */
  }

  .error-tooltip {
    background-color: #dc3545;
    color: white;
    padding: 8px 12px; /* Padding lớn hơn để tooltip rộng hơn */
    border-radius: 4px;
    font-size: 0.9rem; /* Font size lớn hơn */
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Thêm box-shadow để nổi bật */
  }

  .tooltip-arrow {
    position: absolute;
    bottom: -8px; /* Cách xa hơn một chút */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent; /* Arrow lớn hơn */
    border-right: 6px solid transparent;
    border-top: 8px solid #dc3545; /* Arrow cao hơn */
  }
</style>

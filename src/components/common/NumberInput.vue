<template>
  <div class="number-input-wrapper">
    <input
      ref="inputElement"
      type="text"
      class="form-control"
      :class="{ 'text-end': alignRight, 'form-error': error }"
      :value="displayValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div v-if="error" ref="tooltip" class="error-tooltip">
      {{ error }}
      <div class="tooltip-arrow"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    },
    maxLength: {
      type: Number,
      default: 20
    },
    allowNegative: {
      type: Boolean,
      default: false
    },
    allowDecimal: {
      type: Boolean,
      default: true
    },
    decimalPlaces: {
      type: Number,
      default: 2
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    alignRight: {
      type: Boolean,
      default: true
    },
    noRounding: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const inputElement = ref(null)
  const internalValue = ref(props.modelValue?.toString() || '')
  const focused = ref(false)
  const tooltip = ref(null)

  // Watch for external changes to modelValue
  watch(
    () => props.modelValue,
    (newVal) => {
      const stringValue = newVal?.toString() || ''
      if (stringValue !== internalValue.value) {
        internalValue.value = stringValue
      }
    }
  )

  // Calculate display value
  const displayValue = computed(() => {
    // Show unformatted value when focused
    if (focused.value) {
      return internalValue.value
    }

    // Format value when not focused and value is not empty
    if (internalValue.value) {
      try {
        let numValue = parseFloat(internalValue.value)

        // Return formatted value if valid number, otherwise return original value
        if (!isNaN(numValue)) {
          return formatNumber(numValue)
        }
      } catch (e) {
        console.error('Error formatting number:', e)
      }
    }

    return internalValue.value
  })

  // Handle focus event (entering the input)
  const handleFocus = () => {
    focused.value = true
    // Show tooltip if there's an error
    if (props.error && tooltip.value) {
      tooltip.value.style.display = 'block'
    }
  }

  // Handle input change event
  const handleInput = (e) => {
    const inputValue = e.target.value
    const cursorPosition = e.target.selectionStart

    // KIỂM TRA 1: Nếu không cho phép giá trị âm nhưng có dấu trừ
    if (!props.allowNegative && inputValue.includes('-')) {
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
      return
    }

    // KIỂM TRA 2: Nếu không cho phép thập phân nhưng có dấu chấm
    if (!props.allowDecimal && inputValue.includes('.')) {
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
      return
    }

    // KIỂM TRA 3: Nếu vượt quá maxLength (trừ đi dấu chấm và dấu trừ)
    const countableChars = inputValue.replace(/[-.]/g, '')
    if (countableChars.length > props.maxLength) {
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
      return
    }

    // Extract decimal part
    const parts = inputValue.split('.')
    let decimalPart = ''
    if (parts.length > 1) {
      decimalPart = parts[1]
    }

    // KIỂM TRA 4: Nếu phần thập phân vượt quá decimalPlaces
    if (decimalPart.length > props.decimalPlaces) {
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
      return
    }

    // KIỂM TRA 5: Kiểm tra tính hợp lệ của chuỗi nhập vào bằng regex
    const regexPattern = createInputRegex()
    const isValidOrSpecialInput =
      regexPattern.test(inputValue) ||
      inputValue === '' ||
      (props.allowNegative && inputValue === '-') ||
      (props.allowDecimal && props.allowNegative && inputValue === '-.') ||
      (props.allowDecimal && inputValue === '.')

    if (isValidOrSpecialInput) {
      // Nếu nhập liệu hợp lệ, cập nhật giá trị và emit
      internalValue.value = inputValue

      // Emit giá trị số nếu có thể parse
      if (inputValue && inputValue !== '-' && inputValue !== '-.' && inputValue !== '.') {
        const numValue = parseFloat(inputValue)
        emit('update:modelValue', isNaN(numValue) ? '' : numValue)
      } else {
        emit('update:modelValue', inputValue)
      }
    } else {
      // Nếu không hợp lệ, giữ nguyên giá trị cũ
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
    }
  }

  // Handle blur event (leaving the input)
  const handleBlur = () => {
    focused.value = false

    // Hide tooltip
    if (tooltip.value) {
      tooltip.value.style.display = 'none'
    }

    // Format the value when leaving the input
    if (
      internalValue.value &&
      internalValue.value !== '-' &&
      internalValue.value !== '-.' &&
      internalValue.value !== '.'
    ) {
      try {
        // Kiểm tra xem phần số nguyên có vượt quá maxLength không
        const numValue = parseFloat(internalValue.value)
        if (!isNaN(numValue)) {
          // Emit giá trị số một lần nữa để đảm bảo đồng bộ
          emit('update:modelValue', numValue)
        }
      } catch (e) {
        console.error('Error during blur handling:', e)
      }
    }
  }

  // Show tooltip on hover
  const showTooltip = () => {
    if (props.error && tooltip.value) {
      tooltip.value.style.display = 'block'
    }
  }

  // Hide tooltip
  const hideTooltip = () => {
    if (!focused.value && tooltip.value) {
      tooltip.value.style.display = 'none'
    }
  }

  // Watch for error changes
  watch(
    () => props.error,
    () => {
      if (tooltip.value) {
        tooltip.value.style.display = 'none'
      }
    }
  )

  // Add event listeners for hover
  watch(inputElement, (el) => {
    if (el) {
      el.addEventListener('mouseenter', showTooltip)
      el.addEventListener('mouseleave', hideTooltip)
    }
  })

  // Create regex pattern for input validation
  const createInputRegex = () => {
    let pattern = '^'

    // Allow negative sign at the beginning
    if (props.allowNegative) {
      pattern += '-?'
    }

    // Allow digits
    pattern += '\\d*'

    // Allow decimal point and digits after it
    if (props.allowDecimal) {
      pattern += '(\\.\\d*)?'
    }

    pattern += '$'

    return new RegExp(pattern)
  }

  // Format number with comma separators and fixed decimal places
  const formatNumber = (num) => {
    // Get the sign of the number
    const sign = num < 0 ? '-' : ''

    // Work with absolute value for formatting
    const absNum = Math.abs(num)

    let formattedIntPart = ''
    let formattedDecPart = ''

    if (props.noRounding) {
      // Không làm tròn, giữ nguyên số thập phân nhưng vẫn giới hạn độ dài
      const parts = absNum.toString().split('.')
      formattedIntPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      // Nếu có phần thập phân, giữ nguyên nhưng giới hạn độ dài
      if (parts.length > 1) {
        formattedDecPart = parts[1].substring(0, props.decimalPlaces)
      }
    } else {
      // Làm tròn số đến số chữ số thập phân cần thiết
      const rounded = absNum.toFixed(props.decimalPlaces)
      const parts = rounded.split('.')
      formattedIntPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      formattedDecPart = parts.length > 1 ? parts[1] : ''
    }

    // Kết hợp phần nguyên và phần thập phân (nếu có)
    if (formattedDecPart) {
      return `${sign}${formattedIntPart}.${formattedDecPart}`
    } else {
      return `${sign}${formattedIntPart}`
    }
  }
</script>

<style scoped>
  .number-input-wrapper {
    width: 100%;
    position: relative;
  }

  .form-error {
    border-color: #dc3545;
    background-image: none;
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

<template>
  <div class="number-input-wrapper">
    <input
      ref="inputElement"
      type="text"
      class="form-control"
      :class="{ 'text-end': alignRight }"
      :value="displayValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :placeholder="placeholder"
      :disabled="disabled"
    />
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
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const inputElement = ref(null)
  const internalValue = ref(props.modelValue?.toString() || '')
  const focused = ref(false)

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

        // If it's a valid number, format it
        if (!isNaN(numValue)) {
          return formatNumber(numValue)
        }
      } catch (e) {
        console.error('Error formatting number', e)
      }
    }

    return internalValue.value
  })

  // Handle input changes
  const handleInput = (e) => {
    const inputValue = e.target.value
    const cursorPosition = e.target.selectionStart

    // Phân tích giá trị nhập vào
    const parts = inputValue.split('.')

    // KIỂM TRA 1: Nếu có nhiều hơn một dấu thập phân (.)
    if (props.allowDecimal) {
      const decimalCount = (inputValue.match(/\./g) || []).length
      if (decimalCount > 1) {
        e.target.value = internalValue.value
        setTimeout(() => {
          e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
        }, 0)
        return
      }
    }

    // KIỂM TRA 2: Nếu không cho phép số thập phân nhưng có dấu thập phân
    if (!props.allowDecimal && inputValue.includes('.')) {
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
      return
    }

    // Xử lý phần số nguyên
    let integerPart = parts[0]
    if (props.allowNegative && integerPart.startsWith('-')) {
      integerPart = integerPart.substring(1) // Loại bỏ dấu âm khi kiểm tra độ dài
    }

    // KIỂM TRA 3: Nếu phần số nguyên vượt quá maxLength
    if (integerPart.length > props.maxLength) {
      e.target.value = internalValue.value
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
      }, 0)
      return
    }

    // Xử lý phần thập phân nếu có
    if (parts.length > 1) {
      const decimalPart = parts[1]

      // KIỂM TRA 4: Nếu phần thập phân vượt quá decimalPlaces
      if (decimalPart.length > props.decimalPlaces) {
        e.target.value = internalValue.value
        setTimeout(() => {
          e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
        }, 0)
        return
      }
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

    // Format the value when leaving the input
    if (
      internalValue.value &&
      internalValue.value !== '-' &&
      internalValue.value !== '-.' &&
      internalValue.value !== '.'
    ) {
      try {
        // Kiểm tra xem phần số nguyên có vượt quá maxLength không
        const parts = internalValue.value.split('.')
        let intPart = parts[0]
        if (props.allowNegative && intPart.startsWith('-')) {
          intPart = intPart.substring(1)
        }

        // Nếu phần số nguyên vượt quá maxLength, cắt bớt
        if (intPart.length > props.maxLength) {
          // Cắt phần số nguyên để phù hợp với maxLength
          intPart = intPart.substring(0, props.maxLength)

          // Khôi phục dấu âm nếu cần
          let newValue = props.allowNegative && internalValue.value.startsWith('-') ? `-${intPart}` : intPart

          // Thêm phần thập phân nếu có
          if (parts.length > 1 && props.allowDecimal) {
            newValue += `.${parts[1]}`
          }

          internalValue.value = newValue
        }

        const numValue = parseFloat(internalValue.value)
        if (!isNaN(numValue)) {
          if (props.noRounding) {
            // Không làm tròn số, giữ nguyên giá trị
            // Nhưng vẫn cần emit để đảm bảo giá trị là số
            emit('update:modelValue', numValue)
          } else {
            // Limit decimal places when losing focus
            const roundedValue = limitDecimalPlaces(numValue)
            internalValue.value = roundedValue.toString()
            emit('update:modelValue', roundedValue)
          }
        }
      } catch (e) {
        console.error('Error handling blur', e)
      }
    } else if (internalValue.value === '.' || internalValue.value === '-.') {
      // Nếu chỉ có dấu thập phân, xóa bỏ
      internalValue.value = ''
      emit('update:modelValue', '')
    }
  }

  // Handle focus event (entering the input)
  const handleFocus = () => {
    focused.value = true
  }

  // Create regex pattern based on props
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
        // Giới hạn độ dài phần thập phân theo decimalPlaces nhưng không làm tròn
        formattedDecPart = parts[1].substring(0, props.decimalPlaces)
      } else if (props.allowDecimal) {
        // Nếu không có phần thập phân, nhưng allowDecimal = true, thêm các số 0
        formattedDecPart = '0'.repeat(props.decimalPlaces)
      }
    } else {
      // Làm tròn đến số chữ số thập phân chỉ định
      const fixedNum = absNum.toFixed(props.decimalPlaces)
      const parts = fixedNum.split('.')
      formattedIntPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      formattedDecPart = parts.length > 1 ? parts[1] : ''
    }

    // Kết hợp phần nguyên và phần thập phân
    return props.allowDecimal && formattedDecPart
      ? sign + formattedIntPart + '.' + formattedDecPart
      : sign + formattedIntPart
  }

  // Limit decimal places to the specified number
  const limitDecimalPlaces = (num) => {
    const multiplier = Math.pow(10, props.decimalPlaces)
    return Math.round(num * multiplier) / multiplier
  }
</script>

<style scoped>
  .number-input-wrapper {
    width: 100%;
  }
  .number-input-wrapper input {
    font-family: var(--bs-font-monospace, monospace);
  }
</style>

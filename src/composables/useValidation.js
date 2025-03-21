import { ref, reactive } from 'vue'
import { usePopup } from '@/composables/usePopup'
import { validateForm, clearValidationErrors } from '@/utils/validationUtils'

/**
 * Composable for form validation
 * @returns {Object} - Validation methods and state
 */
export function useValidation() {
  const { openCustomPopup } = usePopup()
  const fieldErrors = reactive({})
  const isValidating = ref(false)

  /**
   * Validate a form against a validation schema
   * @param {Object} values - Form values to validate
   * @param {Object} schema - Validation schema
   * @param {Boolean} showErrorPopup - Whether to show error popup on validation failure
   * @returns {Boolean} - Whether validation passed
   */
  const validate = (values, schema, showErrorPopup = true) => {
    isValidating.value = true
    clearValidationErrors(fieldErrors)

    const { isValid, fieldErrors: errors } = validateForm(values, schema)

    // Update the fieldErrors object with the validation results
    for (const field in errors) {
      fieldErrors[field] = errors[field]
    }

    // Show error popup if validation failed and showErrorPopup is true
    if (!isValid && showErrorPopup) {
      showErrorsPopup()
    }

    isValidating.value = false
    return isValid
  }

  /**
   * Clear all validation errors
   */
  const clearErrors = () => {
    clearValidationErrors(fieldErrors)
  }

  /**
   * Clear validation errors for a specific field
   * @param {string} field - Field name to clear errors for
   */
  const clearFieldError = (field) => {
    if (fieldErrors[field]) {
      fieldErrors[field] = []
    }
  }

  /**
   * Get error message for a specific field
   * @param {string} field - Field name
   * @returns {string|undefined} - First error message or undefined
   */
  const getError = (field) => {
    return fieldErrors[field]?.[0]
  }

  /**
   * Check if a field has errors
   * @param {string} field - Field name
   * @returns {boolean} - Whether field has errors
   */
  const hasError = (field) => {
    return !!fieldErrors[field]?.length
  }

  /**
   * Show error popup with validation errors
   */
  const showErrorsPopup = () => {
    openCustomPopup({
      component: 'ErrorPopup',
      title: 'エラー',
      props: {
        message: '処理中にエラーが発生しました。入力内容をご確認ください。'
      },
      onClose: () => {
        // Focus on the first field with an error when the popup is closed
        setTimeout(() => {
          const firstErrorField = document.querySelector('.is-invalid')
          if (firstErrorField) {
            firstErrorField.focus()
          }
        }, 100)
      }
    })
  }

  return {
    fieldErrors,
    isValidating,
    validate,
    clearErrors,
    clearFieldError,
    getError,
    hasError,
    showErrorsPopup
  }
}

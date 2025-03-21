/**
 * Validation utilities for form validation
 */

/**
 * Error messages in Japanese
 */
const errorMessages = {
  required: '必須項目です',
  email: 'メールアドレスの形式が正しくありません',
  number: '数値のみ入力可能です',
  maxLength: '{max}文字以内で入力してください',
  minLength: '{min}文字以上で入力してください',
  pattern: '入力形式が正しくありません',
  positiveNumber: '正の数値を入力してください',
  positiveInteger: '正の整数を入力してください',
  date: '日付形式が正しくありません',
  phone: '電話番号の形式が正しくありません',
  zipCode: '郵便番号の形式が正しくありません',
  custom: '入力内容が正しくありません',
  processingError: '処理中にエラーが発生しました。入力内容をご確認ください。',
  radioRequired: '選択してください',
  checkboxRequired: 'チェックしてください',
  minChecked: '少なくとも{min}つ選択してください',
  maxChecked: '最大{max}つまで選択できます',
  default: '入力してください' // Default message when no specific message is available
}

/**
 * Validation rules
 */
const rules = {
  /**
   * Required field validation
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  required: (value) => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (typeof value === 'number') return true
    if (typeof value === 'boolean') return true
    if (Array.isArray(value)) return value.length > 0
    return !!value
  },

  /**
   * Email format validation
   * @param {string} value - The email to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  email: (value) => {
    if (!value) return true
    // RFC 5322 compliant email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return emailRegex.test(String(value).toLowerCase())
  },

  /**
   * Number validation
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  number: (value) => {
    if (!value) return true
    return !isNaN(Number(value))
  },

  /**
   * Positive number validation
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  positiveNumber: (value) => {
    if (!value) return true
    return !isNaN(Number(value)) && Number(value) > 0
  },

  /**
   * Positive integer validation
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  positiveInteger: (value) => {
    if (!value) return true
    return Number.isInteger(Number(value)) && Number(value) > 0
  },

  /**
   * Max length validation
   * @param {string} value - The value to validate
   * @param {number} max - Maximum length
   * @returns {boolean} - True if valid, false otherwise
   */
  maxLength: (value, max) => {
    if (!value) return true
    return String(value).length <= max
  },

  /**
   * Min length validation
   * @param {string} value - The value to validate
   * @param {number} min - Minimum length
   * @returns {boolean} - True if valid, false otherwise
   */
  minLength: (value, min) => {
    if (!value) return true
    return String(value).length >= min
  },

  /**
   * Pattern validation
   * @param {string} value - The value to validate
   * @param {RegExp} pattern - RegExp pattern to match
   * @returns {boolean} - True if valid, false otherwise
   */
  pattern: (value, pattern) => {
    if (!value) return true
    if (!(pattern instanceof RegExp)) {
      pattern = new RegExp(pattern)
    }
    return pattern.test(String(value))
  },

  /**
   * Date format validation (YYYY-MM-DD)
   * @param {string} value - The date to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  date: (value) => {
    if (!value) return true
    // Simple regex for YYYY-MM-DD format
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value))
  },

  /**
   * Phone number validation
   * @param {string} value - The phone number to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  phone: (value) => {
    if (!value) return true
    // Basic Japanese phone number format
    return /^[0-9\-+]{10,14}$/.test(String(value).replace(/\s/g, ''))
  },

  /**
   * Japanese postal code validation
   * @param {string} value - The postal code to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  zipCode: (value) => {
    if (!value) return true
    // Japanese postal code (3 digits - 4 digits)
    return /^\d{3}-?\d{4}$/.test(String(value))
  },

  /**
   * Radio button required validation
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  radioRequired: (value) => {
    return value !== null && value !== undefined && value !== ''
  },

  /**
   * Checkbox required validation (must be checked/true)
   * @param {boolean} value - The checkbox value
   * @returns {boolean} - True if checked, false otherwise
   */
  checkboxRequired: (value) => {
    return value === true
  },

  /**
   * Minimum number of checkboxes checked validation
   * @param {Array} value - The array of selected values
   * @param {number} min - Minimum number of checkboxes that should be checked
   * @returns {boolean} - True if valid, false otherwise
   */
  minChecked: (value, min) => {
    if (!Array.isArray(value)) return false
    return value.length >= min
  },

  /**
   * Maximum number of checkboxes checked validation
   * @param {Array} value - The array of selected values
   * @param {number} max - Maximum number of checkboxes that should be checked
   * @returns {boolean} - True if valid, false otherwise
   */
  maxChecked: (value, max) => {
    if (!Array.isArray(value)) return true
    return value.length <= max
  }
}

/**
 * Format error message with parameters
 * @param {string} messageTemplate - The message template with placeholders
 * @param {Object} params - The parameters to replace placeholders
 * @returns {string} - Formatted error message
 */
const formatErrorMessage = (messageTemplate, params = {}) => {
  let message = messageTemplate
  for (const [key, value] of Object.entries(params)) {
    message = message.replace(`{${key}}`, value)
  }
  return message
}

/**
 * Validate a field against a set of validation rules
 * @param {any} value - The value to validate
 * @param {Array} validations - Array of validation rules
 * @returns {Object} - {isValid, errors}
 */
const validateField = (value, validations = []) => {
  const errors = []

  for (const validation of validations) {
    // Skip validation for empty values unless it's a required field
    if (
      !rules.required(value) &&
      validation.rule !== 'required' &&
      validation.rule !== 'radioRequired' &&
      validation.rule !== 'minChecked'
    )
      continue

    let isValid = false
    const params = validation.params || {}

    if (typeof validation.rule === 'function') {
      isValid = validation.rule(value, params)
    } else if (typeof rules[validation.rule] === 'function') {
      isValid = rules[validation.rule](value, params)
    } else {
      console.warn(`Unknown validation rule: ${validation.rule}`)
      continue
    }

    if (!isValid) {
      const message =
        validation.message ||
        (validation.rule === 'custom' ? errorMessages.custom : errorMessages[validation.rule] || errorMessages.default)

      errors.push(formatErrorMessage(message, params))
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate an entire form
 * @param {Object} values - The form values
 * @param {Object} validationSchema - The validation schema
 * @returns {Object} - {isValid, errors, fieldErrors}
 */
const validateForm = (values, validationSchema) => {
  const fieldErrors = {}
  let isValid = true

  for (const field in validationSchema) {
    const value = values[field]
    const validations = validationSchema[field]

    const { isValid: fieldIsValid, errors } = validateField(value, validations)

    if (!fieldIsValid) {
      fieldErrors[field] = errors
      isValid = false
    }
  }

  return {
    isValid,
    fieldErrors
  }
}

/**
 * Clear all validation errors from form inputs
 * @param {Object} errors - The errors object to clear
 */
const clearValidationErrors = (errors) => {
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errors[key] = []
    }
  }
}

export { validateField, validateForm, clearValidationErrors, errorMessages, rules }

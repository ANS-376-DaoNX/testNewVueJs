import { usePopupStore } from '@/stores/popupStore'

export function usePopup() {
  const popupStore = usePopupStore()

  /**
   * Open search popup
   * @param {Object} options - Options
   * @param {string} options.title - Popup title
   * @param {Array} options.items - List of items
   * @param {string} options.extraColumnName - Additional column name
   * @param {Function} options.onSearch - Callback when searching
   * @param {Function} options.onSelect - Callback when selecting an item
   * @param {Function} options.onClose - Callback when closing the popup
   * @param {Object} options.config - Popup configuration
   */
  function openSearchPopup(options) {
    popupStore.openPopup({
      type: 'search',
      title: options.title || '検索',
      content: {
        items: options.items || [],
        searchFields: options.searchFields || ['code', 'name'],
        extraColumnName: options.extraColumnName || ''
      },
      callbacks: {
        onSearch: options.onSearch || null,
        onSelect: options.onSelect || null,
        onClose: options.onClose || null
      },
      config: options.config || {}
    })
  }

  /**
   * Open confirmation popup
   * @param {Object} options - Options
   * @param {string} options.title - Popup title
   * @param {string} options.message - Confirmation message
   * @param {string} options.confirmText - Text for confirm button
   * @param {string} options.cancelText - Text for cancel button
   * @param {Function} options.onConfirm - Callback when confirmed
   * @param {Function} options.onCancel - Callback when canceled
   * @param {Function} options.onClose - Callback when closing the popup
   * @param {Object} options.config - Popup configuration
   */
  function openConfirmPopup(options) {
    popupStore.openPopup({
      type: 'confirm',
      title: options.title || '確認',
      content: {
        message: options.message || '',
        confirmText: options.confirmText || 'OK',
        cancelText: options.cancelText || 'キャンセル'
      },
      callbacks: {
        onConfirm: options.onConfirm || null,
        onCancel: options.onCancel || null,
        onClose: options.onClose || null
      },
      config: options.config || {}
    })
  }

  /**
   * Open custom popup
   * @param {Object} options - Options
   * @param {string} options.title - Popup title
   * @param {Object} options.component - Custom component to render
   * @param {Object} options.props - Props to pass to the component
   * @param {Function} options.onClose - Callback when closing the popup
   * @param {Object} options.config - Popup configuration
   */
  function openCustomPopup(options) {
    popupStore.openPopup({
      type: 'custom',
      title: options.title || '',
      content: {
        component: options.component,
        props: options.props || {}
      },
      callbacks: {
        onClose: options.onClose || null
      },
      config: options.config || {}
    })
  }

  /**
   * Close the current popup
   */
  function closePopup() {
    popupStore.closePopup()
  }

  return {
    openSearchPopup,
    openConfirmPopup,
    openCustomPopup,
    closePopup
  }
}

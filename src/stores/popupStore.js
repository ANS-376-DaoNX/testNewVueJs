import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isOpen: false,
    type: '', // 'search', 'confirm', 'info', 'custom'
    title: '',
    content: null, // Có thể là text, object hoặc component
    config: {
      showClose: true,
      showFooter: true,
      width: '80%',
      maxWidth: '800px'
    },
    callbacks: {
      onConfirm: null,
      onCancel: null,
      onClose: null,
      onSearch: null,
      onSelect: null
    },
    data: {
      items: [],
      keyword: '',
      searchFields: ['code', 'name'],
      selectedItem: null,
      extraColumnName: ''
    }
  }),

  getters: {
    popupType: (state) => state.type,
    popupTitle: (state) => state.title,
    popupContent: (state) => state.content,
    popupConfig: (state) => state.config,
    popupCallbacks: (state) => state.callbacks,
    popupData: (state) => state.data
  },

  actions: {
    openPopup(options = {}) {
      this.isOpen = true
      this.type = options.type || 'custom'
      this.title = options.title || '情報'
      this.content = options.content || null

      // Merge config
      if (options.config) {
        this.config = { ...this.config, ...options.config }
      }

      // Setup callbacks
      if (options.callbacks) {
        this.callbacks = {
          onConfirm: options.callbacks.onConfirm || null,
          onCancel: options.callbacks.onCancel || null,
          onClose: options.callbacks.onClose || null,
          onSearch: options.callbacks.onSearch || null,
          onSelect: options.callbacks.onSelect || null
        }
      }

      // Setup search data if needed
      if (this.type === 'search') {
        this.data = {
          items: options.content?.items || [],
          keyword: '',
          searchFields: options.content?.searchFields || ['code', 'name'],
          selectedItem: null,
          extraColumnName: options.content?.extraColumnName || ''
        }
      }

      // Disable body scrolling
      document.body.style.overflow = 'hidden'
    },

    closePopup() {
      this.isOpen = false

      // Call onClose callback if exists
      if (this.callbacks.onClose) {
        this.callbacks.onClose()
      }

      // Reset state
      setTimeout(() => {
        this.type = ''
        this.title = ''
        this.content = null
        this.data.keyword = ''
        this.data.selectedItem = null
      }, 300)

      // Enable body scrolling
      document.body.style.overflow = 'auto'
    },

    confirmAction() {
      if (this.callbacks.onConfirm) {
        this.callbacks.onConfirm()
      }
      this.closePopup()
    },

    cancelAction() {
      if (this.callbacks.onCancel) {
        this.callbacks.onCancel()
      }
      this.closePopup()
    },

    search(keyword) {
      this.data.keyword = keyword

      if (this.callbacks.onSearch) {
        this.callbacks.onSearch(keyword)
      }
    },

    setItems(items) {
      this.data.items = items || []
    },

    selectItem(item) {
      this.data.selectedItem = item

      if (this.callbacks.onSelect) {
        this.callbacks.onSelect(item)
      }
    }
  }
})

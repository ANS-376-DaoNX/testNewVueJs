<template>
  <div class="popup-manager">
    <!-- Search Popup -->
    <SearchPopup
      :is-open="isSearchPopupOpen"
      :title="popupData.title"
      :items="popupData.items"
      :extra-column-name="popupData.extraColumnName"
      :width="popupConfig.width"
      :max-width="popupConfig.maxWidth"
      :initial-keyword="popupData.keyword"
      @close="closePopup"
      @search="handleSearch"
      @select="handleSelect"
    />

    <!-- Confirm Popup -->
    <ConfirmPopup
      :is-open="isConfirmPopupOpen"
      :title="popupData.title"
      :message="popupData.message"
      :width="popupConfig.width"
      :max-width="popupConfig.maxWidth"
      :confirm-text="popupData.confirmText || '確認'"
      :cancel-text="popupData.cancelText || 'キャンセル'"
      @close="closePopup"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />

    <!-- Custom Popup -->
    <BasePopup
      :is-open="isCustomPopupOpen"
      :title="popupData.title"
      :width="popupConfig.width"
      :max-width="popupConfig.maxWidth"
      :show-footer="popupConfig.showFooter"
      :show-confirm-button="popupConfig.showConfirmButton"
      :show-cancel-button="popupConfig.showCancelButton"
      :confirm-text="popupData.confirmText || '確認'"
      :cancel-text="popupData.cancelText || 'キャンセル'"
      @close="closePopup"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div v-if="popupData.content && typeof popupData.content === 'string'">
        {{ popupData.content }}
      </div>
      <component
        v-else-if="popupData.content && typeof popupData.content === 'object'"
        :is="popupData.content.component"
        v-bind="popupData.content.props || {}"
      />
    </BasePopup>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { usePopupStore } from '@/stores/popupStore'
  import BasePopup from './BasePopup.vue'
  import SearchPopup from './SearchPopup.vue'
  import ConfirmPopup from './ConfirmPopup.vue'

  const popupStore = usePopupStore()

  // Getters from store
  const popupType = computed(() => popupStore.popupType)
  const popupData = computed(() => ({
    title: popupStore.popupTitle,
    content: popupStore.popupContent,
    items: popupStore.popupData.items,
    keyword: popupStore.popupData.keyword,
    message: typeof popupStore.popupContent === 'string' ? popupStore.popupContent : '',
    extraColumnName: popupStore.popupData.extraColumnName,
    confirmText: popupStore.popupConfig.confirmText,
    cancelText: popupStore.popupConfig.cancelText
  }))

  const popupConfig = computed(() => popupStore.popupConfig)

  // Computed to determine which popup to show
  const isSearchPopupOpen = computed(() => popupStore.isOpen && popupType.value === 'search')
  const isConfirmPopupOpen = computed(() => popupStore.isOpen && popupType.value === 'confirm')
  const isCustomPopupOpen = computed(() => popupStore.isOpen && popupType.value === 'custom')

  // Handlers that will call store actions
  function closePopup() {
    popupStore.closePopup()
  }

  function handleConfirm() {
    popupStore.confirmAction()
  }

  function handleCancel() {
    popupStore.cancelAction()
  }

  function handleSearch(keyword) {
    popupStore.search(keyword)
  }

  function handleSelect(item) {
    popupStore.selectItem(item)
  }
</script>

<style scoped>
  /* No additional styles needed */
</style>

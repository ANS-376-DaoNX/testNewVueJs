<template>
  <div class="popup-example p-3">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Popup Examples</h5>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-6">
            <h6>Search Popup Example</h6>
            <p>Click the button to open a search popup</p>
            <button class="btn btn-primary" @click="openSearchPopupExample">
              <i class="bi bi-search me-1"></i>Open Search Popup
            </button>
          </div>
          <div class="col-md-6">
            <h6>Confirm Popup Example</h6>
            <p>Click the button to open a confirmation popup</p>
            <button class="btn btn-warning" @click="openConfirmPopupExample">
              <i class="bi bi-question-circle me-1"></i>Open Confirm Popup
            </button>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-6">
            <h6>Custom Popup Example</h6>
            <p>Click the button to open a custom popup</p>
            <button class="btn btn-info text-white" @click="openCustomPopupExample">
              <i class="bi bi-gear me-1"></i>Open Custom Popup
            </button>
          </div>
          <div class="col-md-6">
            <h6>Form Popup Example</h6>
            <p>Click the button to open a form popup</p>
            <button class="btn btn-success" @click="openFormPopupExample">
              <i class="bi bi-pencil me-1"></i>Open Form Popup
            </button>
          </div>
        </div>

        <div class="alert alert-info" v-if="result"><strong>Result:</strong> {{ result }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { usePopup } from '@/composables/usePopup'

  const { openSearchPopup, openConfirmPopup, openCustomPopup } = usePopup()
  const result = ref('')

  // Example data
  const sampleItems = [
    { code: '001', name: '商品A', extraValue: '100円' },
    { code: '002', name: '商品B', extraValue: '200円' },
    { code: '003', name: '商品C', extraValue: '300円' },
    { code: '004', name: '商品D', extraValue: '400円' },
    { code: '005', name: '商品E', extraValue: '500円' }
  ]

  // Search Popup Example
  function openSearchPopupExample() {
    openSearchPopup({
      title: '商品検索',
      items: sampleItems,
      extraColumnName: '価格',
      onSearch: (keyword) => {
        console.log('Searching with keyword:', keyword)
        // In a real app, you would filter items based on the keyword
        // For this example, we'll just log it
      },
      onSelect: (item) => {
        result.value = `Selected item: ${item.name} (${item.code}) - ${item.extraValue}`
      },
      onClose: () => {
        console.log('Search popup closed')
      }
    })
  }

  // Confirm Popup Example
  function openConfirmPopupExample() {
    openConfirmPopup({
      title: '確認',
      message: 'この操作を実行してもよろしいですか？',
      confirmText: '実行する',
      cancelText: 'キャンセル',
      onConfirm: () => {
        result.value = 'Confirmed the action!'
      },
      onCancel: () => {
        result.value = 'Cancelled the action'
      }
    })
  }

  // Custom Popup Example
  function openCustomPopupExample() {
    openCustomPopup({
      title: 'カスタムポップアップ',
      content: `
      <div class="text-center p-3">
        <h4>カスタムコンテンツ</h4>
        <p>このポップアップはカスタムHTMLコンテンツを表示しています。</p>
        <div class="alert alert-success">
          様々な用途に使用できます！
        </div>
      </div>
    `,
      config: {
        width: '500px',
        showFooter: true,
        showConfirmButton: true,
        confirmText: '閉じる'
      },
      onConfirm: () => {
        result.value = 'Custom popup closed with confirm button'
      }
    })
  }

  // Form Popup Example
  function openFormPopupExample() {
    openCustomPopup({
      title: 'フォーム入力',
      content: `
      <div class="p-3">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">名前</label>
            <input type="text" class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">メールアドレス</label>
            <input type="email" class="form-control" id="email">
          </div>
        </form>
      </div>
    `,
      config: {
        width: '500px',
        showFooter: true,
        showConfirmButton: true,
        confirmText: '保存',
        cancelText: 'キャンセル'
      },
      onConfirm: () => {
        result.value = 'Form submitted!'
      },
      onCancel: () => {
        result.value = 'Form cancelled'
      }
    })
  }
</script>

<style scoped>
  /* No additional styles needed */
</style>

<template>
  <BasePopup
    :is-open="isOpen"
    :title="title"
    :width="width"
    :max-width="maxWidth"
    :show-footer="true"
    :show-confirm-button="false"
    :cancel-text="closeText"
    @close="close"
  >
    <div class="search-popup">
      <div class="search-form mb-3">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="searchKeyword"
            placeholder="検索キーワード"
            @keyup.enter="handleSearch"
          />
          <button class="btn btn-outline-secondary" type="button" @click="handleSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <div v-if="items && items.length > 0" class="search-results">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>コード</th>
                <th>名称</th>
                <th v-if="extraColumnName">{{ extraColumnName }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id || item.code" @click="handleSelect(item)" class="cursor-pointer">
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td v-if="extraColumnName && item.extraValue">{{ item.extraValue }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="alert alert-info">検索結果がありません</div>
    </div>
  </BasePopup>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import BasePopup from './BasePopup.vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '検索'
    },
    items: {
      type: Array,
      default: () => []
    },
    extraColumnName: {
      type: String,
      default: ''
    },
    closeText: {
      type: String,
      default: '閉じる'
    },
    width: {
      type: String,
      default: '80%'
    },
    maxWidth: {
      type: String,
      default: '800px'
    },
    initialKeyword: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['close', 'search', 'select'])

  const searchKeyword = ref(props.initialKeyword)

  watch(
    () => props.isOpen,
    (newValue) => {
      if (newValue) {
        searchKeyword.value = props.initialKeyword
        if (props.initialKeyword) {
          handleSearch()
        }
      }
    }
  )

  function handleSearch() {
    emit('search', searchKeyword.value)
  }

  function handleSelect(item) {
    emit('select', item)
    close()
  }

  function close() {
    emit('close')
  }
</script>

<style scoped>
  .search-popup {
    min-height: 300px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-pointer:hover {
    background-color: #e9ecef;
  }
</style>

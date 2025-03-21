<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
  // import { useAuthStore } from '../auth/store'
  import { defineOptions } from 'vue'

  // Đặt tên component
  defineOptions({
    name: 'MainDashboard'
  })

  // Sử dụng authStore nếu cần trong tương lai
  // const authStore = useAuthStore()
</script>

<style scoped>
  .main-container {
    width: 100%;
    height: 100%;
  }
</style>
